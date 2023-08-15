"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { VideoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import Heading from '@/components/Heading'
import { formSchema } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/Empty'
import { Loader } from '@/components/Loader'
import { useProModal } from '@/hooks/use-pro-modal'


const VideoPage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [video, setVideo] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setVideo(undefined)
      const response = await axios.post('/api/video', values)

      setVideo(response.data[0])
      form.reset()
    } catch (error: any) {
      if(error?.response?.status === 403)  {
        proModal.onOpen();
      }
      console.error(error)
    } finally {
      router.refresh();
    }
  }
  console.log(video)
  return (
    <div>
      <Heading 
        title='Video Generation'
        description='Turn your ideas into video.'
        Icon={VideoIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
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
                  <Input {...field} placeholder='Clown fish swimming around the coral reef.' 
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    autoComplete='off'
                  />
                  </FormControl>
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
          {!video && !isLoading && (
            <Empty label='No video generated.' />
          )}
          {video && (
            <video controls className='w-full mt-8 aspect-video rounded-lg border bg-black'>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPage