import { getStartPagePostManyStartPage } from "@/app/actions/startPage";
import { TypeStartPost } from "@/app/types/types";
import PostList from "@/components/startposts/postList";
import StartPagePreview from "@/components/startposts/startpostpreview";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

async function getData(): Promise<TypeStartPost[]> {
  const response = await getStartPagePostManyStartPage();
  return response;
}

const StartPageEdit = async () => {
  const data = await getData();
  return (
    <main>
      <Tabs defaultValue="list" className="container mx-auto py-10">
        <TabsList>
          <TabsTrigger value="list">list</TabsTrigger>
          <TabsTrigger value="view">view</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <PostList></PostList>
        </TabsContent>
        <TabsContent value="view">
          <StartPagePreview></StartPagePreview>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default StartPageEdit;
