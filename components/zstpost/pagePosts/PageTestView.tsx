"use client";
import React, { useContext, useEffect, useState } from "react";
import { TypeZstPost } from "@/app/types/zstTypes";
import { addDays, format } from "date-fns";
import {
  GetDateFromyyyyMMdd,
  GetDateFromyyyyMMdd2,
  GetDateTimeFormat,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  CalendarIcon,
  GridIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ZstDDayTitles from "./zstDDayTitles";
import UserContext from "@/components/user/UserContext";
import ZstAddDialog from "./zstAddDialog";
import { toZonedTime } from "date-fns-tz";
import { getPosts } from "@/app/actions/zstPosts/posts";
import ZstTitle from "./zstTitle";
import { QuoteCollapseible } from "@/components/ui/QuoteCollapseible";
import { Switch } from "@radix-ui/react-switch";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface propTypes {
  datestring: string;
}
const PageTestView = (props: propTypes) => {
  const { datestring } = props;
  const [zstPosts, setZstPosts] = useState<TypeZstPost[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const user = useContext(UserContext);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const actionFormPhysicalDeletion = async () => {
    // console.log("actionFormPhysicalDeletion:id:" + String(zstPost.id));
    // const date = zstPost.current_at;
    // //delete
    // await deleteZstPost(zstPost.id);
    // const datestr = GetyyyyMMddJpFromDate(date);
    // router.push(`/zstPosts/view/day/?date=${datestr}`);
    // window.location.reload(); // ページを再読み込みして最新のデータを取得する
  };

  useEffect(() => {
    // console.log("zstPosts has changed:", zstPosts.slice(0, 2));
    const fetch = async () => {
      const thisdt = GetDateFromyyyyMMdd(datestring);
      const thisdttz = toZonedTime(thisdt, "Asia/Tokyo");
      const ThisZstPosts = await getPosts(user?.userid, thisdttz, thisdttz);
      setZstPosts(ThisZstPosts);
    };
    fetch();
  }, [datestring]);

  return (
    <div className="px-3 py-3">
      <div className="flex py-3  w-full">
        PageTestView-{datestring}-{user?.userid}
      </div>
      <div>
        {zstPosts.map((nowZstPost) => (
          <>
            <ZstTitle zstPost={nowZstPost} isDispDetail={true}>
              <div>
                <div className="flex flex-wrap  items-center space-x-2">
                  <AlertDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <TrashIcon className="h-4 w-4" />
                        <div className="hidden md:inline-block">
                          Physical deletion
                        </div>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogDescription asChild>
                          <div className="flex items-center space-x-2">
                            削除します。よろしいですか？
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={actionFormPhysicalDeletion}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </ZstTitle>
          </>
        ))}
      </div>
    </div>
  );
};

export default PageTestView;
