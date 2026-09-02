import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KuralDetail from "@/components/KuralDetail";

type Props={params:Promise<{id:string}>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {id}=await params;const number=Number(id);if(!Number.isInteger(number)||number<1||number>1330)return{title:"Kural not found"};let description=`Read Kural ${number} with Tamil commentaries, an English meaning, and source attribution.`;try{const response=await fetch(`https://thirukkural.senkanthal.org/kural/${number}`,{next:{revalidate:604800}});if(response.ok){const data=await response.json() as{kural:string};description=data.kural.split("$").join(" — ")}}catch{}return{title:`Thirukkural ${number}`,description,alternates:{canonical:`/kural/${number}`},openGraph:{title:`Thirukkural ${number}`,description,url:`/kural/${number}`,type:"article"}}}
export default async function KuralDetailPage({params}:Props){const {id}=await params;const number=Number(id);if(!Number.isInteger(number)||number<1||number>1330)notFound();return <KuralDetail number={number}/>}
