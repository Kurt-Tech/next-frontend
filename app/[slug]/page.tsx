import ClientPage from './ClientPage'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ClientPage slug={slug} />
}

