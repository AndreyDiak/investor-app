import { ArrowDownOutlined, ArrowUpOutlined, SlidersOutlined } from "@ant-design/icons";
import { Button, Input, Popover, Radio, Space } from "antd";
import { AssetsFilter } from "../../../../models";

import classes from "./MarketFilter.module.css";

interface Props {
   search: string;
   setSearch: (search: string) => void;

   filter: AssetsFilter;
   setFilter: (filter: AssetsFilter) => void;

   reverse: boolean;
   setReverse: (reverse: boolean) => void;
}

export const MarketFilter = ({
   search,
   filter,
   reverse,
   setFilter,
   setSearch,
   setReverse,
}: Props) => {
   const content = (
      <div>
         <Radio.Group
            value={filter}
            defaultValue={AssetsFilter.NONE}
            onChange={(e) => setFilter(e.target.value)}
         >
            <Space direction="vertical">
               <Radio value={AssetsFilter.PRICE}>По цене</Radio>
               <Radio value={AssetsFilter.CONDITION}>По росту</Radio>
               <Radio value={AssetsFilter.DIVIDENDS}>Дивиденды</Radio>
               <Radio value={AssetsFilter.COUNT}>По количеству</Radio>
               <Radio value={AssetsFilter.NONE}>Без фильтра</Radio>
            </Space>
         </Radio.Group>
      </div>
   );
   return (
      <div className={classes.filter}>
         <Input
            placeholder="Название акции..."
            className=""
            value={search}
            onChange={(e) => {
               if (filter !== AssetsFilter.TITLE) {
                  setFilter(AssetsFilter.TITLE);
               }
               setSearch(e.target.value);
            }}
         />

         <Popover content={content} trigger="click" title="Фильтр акций">
            <Button style={{ display: "flex", alignItems: "center" }}>
               Фильтры
               <SlidersOutlined style={{ fontSize: "16px", fontWeight: "normal" }} />
            </Button>
         </Popover>
         <Button
            onClick={() => {
               setReverse(!reverse);
            }}
         >
            {!reverse ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
         </Button>
      </div>
   );
};
