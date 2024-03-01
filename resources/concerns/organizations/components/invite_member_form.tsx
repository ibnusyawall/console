import Button from '@/components/button'
import Input from '@/components/input'
import Label from '@/components/label'
import useParams from '@/hooks/use_params'
import useSuccessToast from '@/hooks/use_success_toast'
import { useForm } from '@inertiajs/react'
import * as React from 'react'

interface InviteMemberFormProps {}

const InviteMemberForm: React.FunctionComponent<InviteMemberFormProps> = () => {
  const params = useParams()
  const form = useForm({ email: '' })
  const successToast = useSuccessToast()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    form.post(`/organizations/${params.organizationSlug}/invite`, {
      onSuccess: () => {
        successToast('Invitation sent successfully')
        form.reset()
      },
    })
  }
  return (
    <form className="!w-full" onSubmit={handleSubmit}>
      <Label>Invite a member</Label>
      <Input
        id="email"
        placeholder="Enter the email address"
        value={form.data.email}
        onChange={(e) => form.setData('email', e.target.value)}
      />
      <Button className="mt-2" type="submit" loading={form.processing}>
        Send Invite
      </Button>
    </form>
  )
}

export default InviteMemberForm
