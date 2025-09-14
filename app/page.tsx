import ClientPage from './[slug]/ClientPage'

export const metadata = {
  title: 'Apex Medical Group',
  description:
    'Compassionate, coordinated care for the whole family. Primary care, telehealth, urgent care, and specialty services.',
}

export default function Home() {
  return <ClientPage slug="home" />
}
