import { notFound } from 'next/navigation';
import { getSinglePost } from '../(functions)/getAllPublished';
import { CustomMDX } from './mdx-remote'
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    console.log(`Finding page... ${id}`)

    try {
        const post = await getSinglePost(id)
        if (!post.success) {
            notFound();
        }
        const source = post.markdown.parent
    
        return (
            <main className="RecipePage">
                <section className="postHeader">
                <h1>{post.metadata.title}</h1>
                <Link href="/" className="GoBack">Volver</Link>
                {
                    post.metadata.tags.length > 0 || post.metadata.ingredientes.length > 0 && 
                    <div className="postMetadata">
                    <h3>Metadatos</h3>
                    <p>{post.metadata.tags.join(' ')}</p>
                    <p>{post.metadata.ingredientes.join(', ')}</p>
                    </div>
                }
                </section>
                <section className="postContent">
                <Suspense fallback={<ContentLoading />}><CustomMDX source={source} /></Suspense>
                </section>
            </main>
        )
    } catch (err) {
        console.log(`Error getting page ${err}`)
        notFound();
    }

}

function ContentLoading(){
    return (<div>Loading content...</div>)
}