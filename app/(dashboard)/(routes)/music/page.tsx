"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MusicIcon } from 'lucide-react'
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


const MusicPage = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [music, setMusic] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    try {
      setMusic(undefined)
      const response = await axios.post('/api/music', values)
      setMusic(response.data.audio)
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
  console.log(music)
  return (
    <div>
      <Heading 
        title='Music Generation'
        description='Turn your ideas into music.'
        Icon={MusicIcon}
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
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
                  <Input {...field} placeholder='Piano solo' 
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
          {!music && !isLoading && (
            <Empty label='No music generated.' />
          )}
          {music && (
            <audio controls className='w-full mt-8'>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  )
}

export default MusicPage