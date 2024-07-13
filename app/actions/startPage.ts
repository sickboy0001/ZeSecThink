"use server"

import { createClient } from "@/utils/supabase/server";
import {TypeStartType,TypeStartPost} from "@/app/types/types"


export async function getStartPageTypeMany(){
    // const res = await prisma.start_type.findMany({orderBy:{display_order:'asc'}});
    // return res;
    
    const supabase = createClient();
    const { data:res,error } = await supabase.from('start_type').select('*');
    if (error) {
        console.log(error)
        // throw new Error(error.message);
      }
    console.log(res)
    return res||[];

}   


export const getStartPagePostMany = async ()=>{
    const supabase = createClient()
    const { data:res,error } = await supabase.from('start_post').select('*')
    if (error) {
        console.log(error)
        // throw new Error(error.message);
      }
    // console.log("getStartPagePostMany:data:",data)
    res?.forEach(item => {
        item.title;
    });
    return res;
    // const res = await prisma.start_post.findMany()
    // return res;
}
export const getStartPagePostManyStartPage = async ()=>{
    const supabase = createClient()
    const { data:res,error } = await supabase.from('start_post').select('*')
        .eq('public_flg', true)
        .order('type_id', { ascending: true });
    
    if (error) {
        console.log(error)
      }

    if(res!=null){

        res.forEach(item => {
            console.log(item.title)
        });
        }

    return res||[];


}

export const getStartPagePost = async (id :number)=>{

    const supabase = createClient()
    const { data:res,error } = await supabase.from('start_post').select('*')
        .eq('id', id)
        .limit(1)

    if (error) {
        console.log(error)
      }
    if(res==null){
        return null;
    }else{
        return res[0];
    }

}


export const createStartPagePost = async ({params}:{params:{user_id:number , 
                title:string , content:string , public_flg:boolean,delete_flg:boolean,type:string}}) =>{
    
   const {user_id,title,content,public_flg,delete_flg,type}=params;

    const type_id = await getStartPageType(type);    


    const supabase = createClient()
    try {
        const { data:res,error } = await supabase.from('start_post').insert([
            {
                user_id:user_id ,
                title:title , 
                content:content,
                public_flg :public_flg,
                delete_flg :delete_flg,
                type_id:type_id,
    
            }
        ])
        if (error) {
            console.log("■■■■データの登録失敗",error)
        }
    } catch (error) {
        console.log("■■■■データの登録失敗",error)
           
    }
};

export const updateStartPagePost = async ({params}:{params:{id:number , user_id:number , 
    title:string , content:string , public_flg:boolean,delete_flg:boolean,type:string}}) =>{

const {id, user_id,title,content,public_flg,delete_flg,type}=params;

const type_id = await getStartPageType(type);    

const supabase = createClient()

console.log('id:', String(id))
console.log('user_id:', String(user_id))
console.log('type_id:', String(type_id))

const {  error: putError } = await supabase
.from('start_post')
.update({
    user_id:user_id ,
    title:title , 
    content:content,
    public_flg :public_flg,
    delete_flg :delete_flg,
    type_id:type_id,
})
.eq('id', id.toString())

if (putError) {
    console.log("■■■■データの登録失敗",putError)
}

return ;


};

export const getStartPageType = async (type:string)=>{
    const supabase = createClient()
    const { data:res,error } = await supabase.from('start_type').select('id')
        .eq('name', type)
        .limit(1)

    if (error) {
        console.log(error)
      }
    if(res==null){
        return null;
    }else{
        return res[0].id;
    }

    // const res = await prisma.start_type.findMany(
    //     {where:{
    //         name:type
    //     }}
    //  );
    //  return res[0].id;
}
