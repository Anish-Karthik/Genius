
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from './ui/badge'
import { ArrowRight, MessageSquareIcon, ImageIcon, VideoIcon, MusicIcon, CodeIcon, CheckIcon, ZapIcon } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'


const tools = [
  {
    label: "Conversation Tools",
    icon: MessageSquareIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },    
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    href: '/code',
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
];
export const ProModal = () => {
  const proModal = useProModal()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')
      router.push(response.data.url)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2'>
            <div className='flex items-center gap-x-2 font-bold py-1'>
              Upgrade to Genius
              <Badge variant="premium" className='uppercase text-sm py-1'>
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className='text-center pt-2 space-y-2 text-zinc-900 font-medium'>
            
            {tools.map((tool, index) => (
              <Card
                key={tool.label}
                className='p-3 border-black/5 flex items-center justify-between'
              >
                <div className='flex items-center gap-x-4'>
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-6 h-6", tool.color)} />
                  </div>
                  <div className='text-sm font-semibold'>
                    {tool.label}
                  </div>
                </div>
                <div>
                  <CheckIcon className='text-primary w-5 h-5' />
                </div>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
            onClick={onSubscribe}
            disabled={loading}
          >
            Upgrade
            <ZapIcon className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}
