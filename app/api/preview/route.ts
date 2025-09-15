import { draftMode } from 'next/headers'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug') || 'home'
  const dm = await draftMode()
  dm.enable()
  const redirectURL = new URL(`/${slug}`, req.url)
  return Response.redirect(redirectURL)
}
