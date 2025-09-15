import ClientPage from './ClientPage'
import { draftMode } from 'next/headers'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const dm = await draftMode()
  const isDraft = dm.isEnabled
  return <ClientPage slug={slug} draft={isDraft} />
}
