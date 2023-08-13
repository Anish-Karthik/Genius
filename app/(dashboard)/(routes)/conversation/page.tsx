"use client"

import { MessageSquareIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import Heading from '@/components/Heading'

import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ConversationPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  console.log(form)
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <div>
      <Heading 
        title='Conversation'
        description='Chat with the smartest AI on the planet'
        Icon={MessageSquareIcon}
        iconColor='text-violet-500'
        bgColor='bg-violet-500/10'
      />
      <div className='px-4 ld:px-8'>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className='roundeed-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              <FormField name='prompt' render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-10'>
                  <FormControl className='m-0 p-0'>
                  <Input {...field} placeholder='What are the best stocks to buy?' 
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                  />
                  </FormControl>
                </FormItem>
              )} />
              <Button type='submit' className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>
                Ask
              </Button>
            </form>
          </Form>
        </div>
        <div className='mt-4 space-y-4'>
          Messages
        </div>
      </div>
    </div>
  )
}

export default ConversationPage