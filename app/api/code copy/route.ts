import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs"
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, inputLang, outputLang } = body;

    const messages:ChatCompletionRequestMessage[] = [ { role: "system", content: prompt }]
    console.log("[CODE_CONVERT]", body);

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Missing messages", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const instructionMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: `You are a code convertor. You must answer only in markdown code snippets. Use code comments for explanations. You have to convert given code in ${inputLang} to ${outputLang} language. output code should be error free and runnable. Must follow the best practices of ${outputLang} language and add boilerplate code if needed.`
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });
    if (!isPro) {
      await increaseApiLimit();
    }
    // send only the last message (response.data.choices[0].message), { status: 200 });
    const lastMessage = response.data.choices[0].message?.content;
    console.log("[CODE_CONVERT]", lastMessage);
    return new NextResponse(JSON.stringify(lastMessage), { status: 200 });

  } catch (error) {
    console.error("[CODE_CONVERT]",error);
    return new NextResponse("Internal error", { status: 500 });
  }
}