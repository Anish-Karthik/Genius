"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CodeIcon, Download, DownloadIcon, ImageIcon } from 'lucide-react'
import { set, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { cn } from '@/lib/utils'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import Heading from '@/components/Heading'
import { amountOptions, formSchema, resolutionOptions } from './constants'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Empty } from '@/components/Empty'
import { Loader } from '@/components/Loader'
import { UserAvatar } from '@/components/UserAvatar'
import { BotAvatar } from '@/components/BotAvatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'
import { useProModal } from '@/hooks/use-pro-modal'


const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: "1",
      resolution: "512x512",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      setImages([])
      const response = await axios.post('/api/image', values)
      const urls = response.data.map((image: {url: string}) => image.url)
      setImages(urls)
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
  console.log(images)
  return (
    <div>
      <Heading 
        title='Image Generation'
        description='Convert your text into Images.'
        Icon={ImageIcon}
        iconColor='text-pink-600'
        bgColor='bg-pink-600/10'
      />
      <div className='px-4 ld:px-8'>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className='roundeed-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
            >
              <FormField name='prompt' render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-6'>
                  <FormControl className='m-0 p-0'>
                  <Input {...field} placeholder='A picture of an galaxy with beautiful stars.' 
                    className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                    disabled={isLoading}
                    autoComplete='off'
                  />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name='amount' control={form.control} render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={amountOptions[0].value}
                  >
                    <FormControl className='' >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField name='resolution' control={form.control} render={({ field }) => (
                <FormItem className='col-span-12 lg:col-span-2'>
                  
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange} 
                    value={field.value} 
                    defaultValue={resolutionOptions[1].value}
                  >
                    <FormControl className='' >
                      <SelectTrigger>
                        <SelectValue>
                          {field.value}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
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
            <div className='p-20'>
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label='No Images Generated.' />
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
            {images.map((src) => (
              <Card
                key={src}
                className='rounded-lg overflow-hidden'
              >
                <div className='relative aspect-square'>
                  <Image
                    src={src}
                    alt='Image'
                    fill
                  />
                </div>
                <CardFooter>
                  <Button 
                    variant={"secondary"} 
                    className='"w-full'
                    onClick={() => window.open(src, '_blank')}
                  >
                    <DownloadIcon className='w-4 h-4 mr-2' />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ImagePage