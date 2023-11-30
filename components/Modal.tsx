import { useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Button from './Button'
import useCurrentUser from '@/hooks/useCurrentUser'
import axios from 'axios'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  actionLabel: string
  disabled?: boolean
  withDelete?: boolean
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, actionLabel, footer, disabled, withDelete }) => {
  const { data: currentUser } = useCurrentUser()

  const router = useRouter()
  const handleClose = useCallback(() => {
    if (disabled) {
      return
    }

    onClose()
  }, [onClose, disabled])

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return
    }

    onSubmit()
  }, [onSubmit, disabled])

  if (!isOpen) {
    return null
  }

  const handleDelete = () => {
    axios.delete(`/api/users/${currentUser.id}`).then(res => res.data)
    window.location.href = '/'
    signOut()
  }

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800 bg-opacity-70'>
        <div className='relative w-full h-full mx-auto my-6 lg:w-3/6 lg:max-w-3xl lg:h-auto'>
          {/*content*/}
          <div className='relative flex flex-col w-full h-full bg-black border-0 rounded-lg shadow-lg outline-none lg:h-auto focus:outline-none'>
            {/*header*/}
            <div className='flex items-center justify-between p-10 rounded-t '>
              <h3 className='text-3xl font-semibold text-white'>{title}</h3>
              <button className='p-1 ml-auto text-white transition border-0 hover:opacity-70' onClick={handleClose}>
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/*body*/}
            <div className='relative flex-auto p-10'>{body}</div>
            {/*footer*/}
            <div className='flex flex-col gap-2 p-10'>
              <Button disabled={disabled} label={actionLabel} secondary fullWidth large onClick={handleSubmit} />
              {withDelete ? <Button label='Delete' withDelete fullWidth large onClick={handleDelete} /> : null}
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
