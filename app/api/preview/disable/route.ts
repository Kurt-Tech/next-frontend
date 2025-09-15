import { draftMode } from 'next/headers'

export async function GET(req: Request) {
  const dm = await draftMode()
  dm.disable()
  const referer = req.headers.get('referer')
  const redirectURL = referer ? new URL(referer) : new URL('/', req.url)
  return Response.redirect(redirectURL)
}

