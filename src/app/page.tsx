import { getAllPublished} from '@/app/(functions)/getAllPublished'
import { MainApp } from './components/MainApp';
import { TopArrow } from './components/topArrow';

export type PostType = {
  id: string,
  title: string[],
  tags: string[],
  ingredientes: string[],
  url: string,
  slug: string
}

export default async function Home() {
  const data = await getAllPublished();

  return (<main>
    <h1>Recetario</h1>
    { data && <MainApp posts={data} />}
    <TopArrow />
    <Footer />
  </main>)
}

function Footer(){
  return (
    <footer className="footer">
      <hr className="footerHR" />
      <p>Creado con <span className="icon">❤️</span> · <span className="cafe">☕️</span> · <span className="invader">👾</span></p>
    </footer>

  )
}
