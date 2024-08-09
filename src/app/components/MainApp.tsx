'use client'
import { PostType } from "@/app/page";
import { useState } from 'react';
import Link from 'next/link';

export function MainApp ({posts}: {posts: PostType[]}) {
    const [ filterText, setFilterText ] = useState('');
    const [ eventOn, setEventOn ] = useState(false);

    let recipeLookup = posts.filter((p: PostType) => p.title.join(' ').toLowerCase().indexOf(filterText.toLowerCase()) !== -1)
    
    return (
        <>
        {
            !eventOn ? <><section className="mainRecipes">
            <SearchBar filterText={filterText} onFilterTextChange={setFilterText}/>
            {
                filterText === '' ? (
                    posts.map((post: PostType, index: number) => (
                        <RecipeCard key={index} post={post} event={setEventOn}/>
                    ))
                ): (
                    recipeLookup.length > 0 ? 
                    recipeLookup.map((post: PostType, index: number) => {
                        return (
                            <RecipeCard key={index} post={post} event={setEventOn} />
                        )
                    }) :
                    <div className="itemNotFound">
                        <h1 className="itemNotFoundH1">Oops!</h1>
                        <p>{`No encuentro «${filterText}» 🙈`}</p>
                    </div>
                    
                )
            }  
            </section>
            <section className="count">
            <p><b>Total recipes: </b> {Object.keys(posts).length}</p>
            </section>
            </>
            : <>
                    <div className="itemNotFound">
                        <h1 className="itemNotFoundH1">¡Voy!</h1>
                        <p>{`Ya estoy yendo...`}</p>
                    </div>
            </>
        }
        </>
    )
}

function SearchBar({filterText, onFilterTextChange}:{
    filterText: string,
    onFilterTextChange: Function
}) {

    return (
        <form id="searchbar" key="searchbar-key" className="searchForm">
        <input 
        type="text"
        id="search"
        placeholder='🔍 Buscar...'
        onChange={(e) => onFilterTextChange(e.target.value)}
        value={filterText}
        />
      </form>
    )
}

function RecipeCard({post, event}:{
    post: PostType,
    event: Function
}){
    const [ isHovered, setIsHovered ] = useState(false);

    function handleMouseEnter(){
        setIsHovered(true);
    };

    function handleMouseLeave() {
        setIsHovered(false);
    }

    function handleEventOn() {
        setTimeout(() => {
            event(true)
        }, 1500);
    }

    return(
        <Link href={`/${post.id}`} className={`recipeCard${isHovered ? ' hovered': ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleEventOn}
        >
        <h2>{post.title}</h2>
        {
            post.ingredientes.length > 0 && 
            <><hr className="recipeCardHR"/>
            <p>{post.ingredientes.join(', ')}</p></>
        }
        </Link>
    )
}