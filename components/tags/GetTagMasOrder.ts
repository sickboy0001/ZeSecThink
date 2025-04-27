import { readTagMas } from "@/app/actions/Tag/TagMas";
import { readTagOrder } from "@/app/actions/Tag/TagOrder";
import { TypeTagMas, TypeTagOrder } from "@/app/types/tagTypes";

// const getItems = () => ["Apple", "Banana", "Cherry"];
interface getTagMasOrderProp {
  user_id: number;
}

export async function getTagMasOrder(
  prop: getTagMasOrderProp,
): Promise<{ sortedTagMas: TypeTagMas[]; normalTagMas: TypeTagMas[] }> {
  const type = "fav";
  console.log("getTagMasOrder start");
  const rawTagOrder = await readTagOrder({ userId: prop.user_id, type: type });
  if (!rawTagOrder) {
    return { sortedTagMas: [], normalTagMas: [] };
  }
  console.log("getTagMasOrder start");
  const stringOrder = !rawTagOrder ? "" : (rawTagOrder as TypeTagOrder).tag_ids;
  console.log("rawTagOrder");
  console.log(stringOrder);

  const rawTagMas = await getTagMas(prop);

  if (!rawTagMas || !stringOrder) {
    return { sortedTagMas: [], normalTagMas: [] }; // tagMas が取得できないか、オーダーがない場合はそのまま返す
  }
  // stringOrder を ID の配列に変換
  const orderIds = stringOrder.split(",");

  // ID をキーとした Map を作成して、rawTagMas の要素を効率的に検索
  const tagMap = new Map(rawTagMas.map((tag) => [String(tag.id), tag])); // ここを修正

  // orderIds の順に tagMap から要素を取り出し、新しい配列を作成
  const sortedTagMas: TypeTagMas[] = [];
  for (const id of orderIds) {
    const tag = tagMap.get(id);
    if (tag) {
      sortedTagMas.push(tag);
    }
  }

  const normalTagMas: TypeTagMas[] = [];
  const orderedIdsSet = new Set(orderIds);
  // rawTagMas をループ処理し、sortedTagMas に含まれない要素を normalTagMas に追加
  for (const tag of rawTagMas) {
    if (!orderedIdsSet.has(String(tag.id))) {
      normalTagMas.push(tag);
    }
  }
  // console.log("tagMap", tagMap);
  // console.log("normalTagMas", normalTagMas);

  return { sortedTagMas: sortedTagMas, normalTagMas: normalTagMas };
}

async function getTagMas(
  prop: getTagMasOrderProp,
): Promise<TypeTagMas[] | null> {
  const user_id = prop;
  const response = await readTagMas(user_id);

  if (!response) {
    return null;
  }

  return (response as any[]).map((item: any) => ({
    id: item.id,
    user_id: item.user_id,
    tag_name: item.tag_name,
    name: item.name,
    description: item.description,
    visible_flg: item.visible_flg,
    favorite_flg: item.favorite_flg,
    public_flg: item.public_flg,
    create_at: item.create_at,
    update_at: item.update_at,
  }));
}
