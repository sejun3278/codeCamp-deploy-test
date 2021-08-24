import { request, gql } from 'graphql-request';
import Head from 'next/head';

const FETCH_USEDITEM = gql` 
    query fetchUseditem($useditemId : ID!) {
        fetchUseditem(useditemId : $useditemId) {
            name
            remarks
            images
        }
    }
`

export default function MarketPage(props) {

    return (
        <>
            <Head>
                <meta property="og:title" content={props.fetchUseditem.name} />
                <meta property="og:discription" content={props.fetchUseditem.remarks} />
                <meta property="og:image" content={props.fetchUseditem.images[0]} />
            </Head>
            <div> 
                상품 페이지입니다.
            </div>   
        </>
    )
}
//
export const getServerSideProps = async (context) => {
    const result = await request('https://backend02.codebootcamp.co.kr/graphql', FETCH_USEDITEM, {
        useditemId : context.query.id
    })

    return {
        props : {
            fetchUseditem : result.fetchUseditem
        }
    }
}