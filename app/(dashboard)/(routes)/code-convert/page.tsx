"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Code2Icon, CodeIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import Heading from '@/components/Heading'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChatCompletionRequestMessage } from 'openai'
import { Empty } from '@/components/Empty'
import { Loader } from '@/components/Loader'
import { UserAvatar } from '@/components/UserAvatar'
import { BotAvatar } from '@/components/BotAvatar'
import { useProModal } from '@/hooks/use-pro-modal'
import { toast } from 'react-hot-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { programmingLanguages } from './constants'


const CodePage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [message, setMessage] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      inputLang: "any",
      outputLang: "Not selected",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      
      const response = await axios.post('/api/code-convert', values)
      setMessage(response.data)
    } catch (error: any) {
        if(error?.response?.status === 403)  {
          proModal.onOpen();
      } else {
        toast.error(error?.response?.data?.message || 'Something went wrong')
      }
    } finally {
      router.refresh();
    }
  }
  console.log(message)
  return (
    <div>
      <Heading 
        title='Code Conversion'
        description='Powerful code conversion with AI'
        Icon={Code2Icon}
        iconColor='text-blue-700'
        bgColor='bg-blue-700/10'
      />
      <div className='px-4 ld:px-8'>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className='roundeed-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              <FormField name='prompt' render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-6  '>
                  <FormControl className='m-0 p-0'>
                  <Input {...field} placeholder='print("Hello World")' 
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    autoComplete='off'
                  />  
                  </FormControl>
                </FormItem>
              )} />
              <FormField name='inputLang' control={form.control} render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={"any"}
                  >
                    <FormControl className='' >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {programmingLanguages.map((lang) => (
                        <SelectItem
                          key={lang}
                          value={lang}
                        >
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField name='outputLang' control={form.control} render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={"None"}
                  >
                    <FormControl className='' >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {programmingLanguages.map((lang) => (
                        <SelectItem
                          key={lang}
                          value={lang}
                        >
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <Button type='submit' className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className='mt-4 space-y-4'>
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {!message && !isLoading && (
            <Empty label='No conversation started.' />
          )}
          {message && !isLoading && (
          <div className="p-8 w-full flex items-start gap-x-8 bg-muted justify-start">
            <ReactMarkdown components={{
              pre: ({ node, ...props }) => (
                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                  <pre {...props} />
                </div>
              ),
              code: ({ node, ...props }) => (
                <code className="bg-black/10 rounded-lg p-1" {...props} />
              )
            }} className="text-sm overflow-hidden leading-7">
              {message || ""}
            </ReactMarkdown>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CodePage