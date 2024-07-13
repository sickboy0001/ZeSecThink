import {
  getStartPagePost,
  getStartPageTypeMany,
} from "@/app/actions/startPage";
import StartPageEdit from "@/components/startposts/StartPageEdit";

export default async function StartPostEdit({
  params,
}: {
  params: { id: string };
}) {
  const startPageTypeMany = await getStartPageTypeMany();
  const startPagePost = await getStartPagePost(parseInt(params.id));

  console.log("startPagePost", startPagePost);
  // console.log(startPagePost);
  // console.log(startPageType);

  return (
    <>
      {startPagePost && (
        <StartPageEdit
          startPagePost={startPagePost}
          startPageTypeMany={startPageTypeMany}
        />
      )}
    </>
  );
}
