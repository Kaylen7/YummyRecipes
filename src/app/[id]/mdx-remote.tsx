// components/mdx-remote.js
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image, { ImageProps } from 'next/image'
import styles from './mdx.module.css'

const components = {
  h2: (props: any) => (
    <h2 {...props} className={styles.recipeHeading2}>
      {props.children}
    </h2>
  ),
  img: (props: any) => (
    <Image 
    sizes='100vh'
    width={100}
    height={100}
    priority
    placeholder="blur"
    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAAKCAYAAAAnx3TwAAAAUElEQVR42u3XMQEAAAQAMNKKIToxOLYWy6jpAAAAAE6loAMAAICgAwAAAIIOAAAAgg4AAAAIOgAAAAg6AAAAIOgAAAAg6AAAAICgAwAAwD8Los4S/fpn5BoAAAAASUVORK5CYII="
    className={styles.recipeImage}
    {... (props as ImageProps)}
    />
  ),
  ul: (props: any) => (
    <ul {...props} className={styles.recipeUL}>
    {props.children}
    </ul>
  ),
  ol: (props: any) => (
    <ol {...props} className={styles.recipeOL}>
    {props.children}
    </ol>
  ),
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}