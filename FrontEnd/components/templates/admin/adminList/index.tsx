"use client";

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import {
  ColumnDef,
  DataTable,
} from '@components/atoms/defaultElements/table';
import CustomPagination from '@components/molecules/pagination';

function AdminList({ ...props }: any) {
  try {
  const { list, entity } = props;
  const { records, actionsJson, columnsJson, totalCount } = list;
  const route = useRouter();
  const locale = useLocale();
  const columns = JSON.parse(columnsJson);
  const actions = JSON.parse(actionsJson);
  const optionalColumns: ColumnDef<Record<string, any>>[] = [
    ...columns,
    {
      Header: "عملیات",
      Accessor: "options",
      Type: "action",
    },
  ];
console.log(columns)
  // اضافه کردن فیلد options به هر رکورد
  const optionalRecords = records.map((r: any) => ({
    ...r,
    options: actions,
  }));
  const handleChangePage = (page: number, pageSize: number) => {
    route.push(
      `/${locale}/admin/${entity}?ByConfig=true&page=${page}&pageSize=${pageSize}`,
    );
  };
  const recordHeight = 60;
  const deviceHeight = window.innerHeight;
  const recordsPerPage = Math.floor((deviceHeight - 140) / recordHeight);
  return (
    <>
      <div className="flex flex-col items-end gap-2">
        <DataTable
        actions={actions}
          columns={optionalColumns}
          data={optionalRecords}
          entity={entity}
          pageSize={recordsPerPage}
        />
        <CustomPagination
          total={totalCount}
          showSizeChanger={true}
          showTitle={true}
          pageSize={recordsPerPage}
          onChange={handleChangePage}
        />
      </div>
    </>
  );
} catch (error) {
   console.log(error)
 }
}
export default AdminList;
// [{"Header":"\u0634\u0646\u0627\u0633\u0647","Accessor":"id","Type":"number","Options":["Active","Edit", "Delete"]},{"Header":"\u0639\u0646\u0648\u0627\u0646 \u0641\u0627\u0631\u0633\u06CC","Accessor":"titleFa","Type":"text","Options":["Active","Edit", "Delete"]},{"Header":"\u0639\u0646\u0648\u0627\u0646 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Accessor":"titleEn","Type":"text","Options":["Active","Edit", "Delete"]},{"Header":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0641\u0627\u0631\u0633\u06CC","Accessor":"contentFa","Type":"textarea","Options":["Active","Edit", "Delete"]},{"Header":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Accessor":"contentEn","Type":"textarea","Options":["Active","Edit", "Delete"]},{"Header":"\u0627\u0633\u0644\u0627\u06AF","Accessor":"slug","Type":"text","Options":["Active","Edit", "Delete"]},{"Header":"\u062A\u0635\u0648\u06CC\u0631 \u0634\u0627\u062E\u0635","Accessor":"thumbnailUrl","Type":"image","Options":["Active","Edit", "Delete"]},{"Header":"\u0634\u0646\u0627\u0633\u0647 \u0646\u0648\u06CC\u0633\u0646\u062F\u0647","Accessor":"authorId","Type":"number", "Options":["Active","Edit", "Delete"]}]
