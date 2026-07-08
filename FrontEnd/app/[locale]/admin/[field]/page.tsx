import React from 'react';

import AdminList from '@components/templates/admin/adminList';
import { getAll } from '@lib/getAll';

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
   params: Promise<{ field: string }> | { field: string };
   searchParams?:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
}) {
    const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;
      const resolvedParams = params instanceof Promise ? await params : params;
  const { field:entity } = resolvedParams;
  const page = parseInt(
    (resolvedSearchParams?.page as string) ?? "1"
  );
  const pageSizeNumber = parseInt(
    (resolvedSearchParams?.pageSize as string) ?? "10"
  );
    const filter = resolvedSearchParams?.q as string
  const list = await getAll(entity, {
    page: page,
    pageSize: pageSizeNumber,
    byConfig:true,
    onlyActives:false,
    filter
  });
   return ( <AdminList list={list?.data} entity={entity} />);
}

  /* <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.49967 4.33337C5.30306 4.33337 4.33301 5.30342 4.33301 6.50004C4.33301 7.69666 5.30306 8.66671 6.49967 8.66671C7.69629 8.66671 8.66634 7.69666 8.66634 6.50004C8.66634 5.30342 7.69629 4.33337 6.49967 4.33337Z" stroke="#B1B1B1" stroke-linecap="round" stroke-linejoin="round"/>
</svg> */


// SELECT C.TABLE_CATALOG DbName
// 		  ,CONCAT_WS('.' , C.TABLE_SCHEMA , C.TABLE_NAME ) TableFullName
// 		  ,C.COLUMN_NAME
// 		  ,C.IS_NULLABLE
// 	      ,CASE WHEN DOMAIN_NAME IS NULL THEN
// 		                                      CASE WHEN  DATA_TYPE + '('+
//                                                                           CASE WHEN DATA_TYPE IN ('char', 'varchar', 'nchar', 'nvarchar') THEN
// 																													                           CASE WHEN CHARACTER_MAXIMUM_LENGTH = -1 THEN 'MAX'
// 																														                            ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS NVARCHAR)
// 																													                           END
// 													                           WHEN DATA_TYPE IN ('binary', 'varbinary') THEN
// 																								                              CASE WHEN CHARACTER_OCTET_LENGTH = -1 THEN 'MAX'
// 																										                           ELSE CAST(CHARACTER_OCTET_LENGTH AS NVARCHAR)
// 																								                              END
// 													                           WHEN DATA_TYPE IN ('decimal', 'numeric') THEN CAST(NUMERIC_PRECISION AS NVARCHAR) + ',' + CAST(NUMERIC_SCALE AS NVARCHAR)
// 													                           WHEN DATA_TYPE IN ('datetimeoffset') THEN CAST(DATETIME_PRECISION AS NVARCHAR)
// 												                          END  +')' IS NULL THEN DATA_TYPE ELSE DATA_TYPE + '('+

// 											                                                                                    CASE WHEN DATA_TYPE IN ('char', 'varchar', 'nchar', 'nvarchar') THEN
// 																													                                                                                 CASE WHEN CHARACTER_MAXIMUM_LENGTH = -1 THEN 'MAX'
// 																														                                                                                  ELSE CAST(CHARACTER_MAXIMUM_LENGTH AS NVARCHAR)
// 																													                                                                                 END
// 													                                                                                 WHEN DATA_TYPE IN ('binary', 'varbinary') THEN
// 																								                                                                                    CASE WHEN CHARACTER_OCTET_LENGTH = -1 THEN 'MAX'
// 																										                                                                                 ELSE CAST(CHARACTER_OCTET_LENGTH AS NVARCHAR)
// 																								                                                                                    END
// 													                                                                                 WHEN DATA_TYPE IN ('decimal', 'numeric') THEN CAST(NUMERIC_PRECISION AS NVARCHAR) + ',' + CAST(NUMERIC_SCALE AS NVARCHAR)
// 													                                                                                 WHEN DATA_TYPE IN ('datetimeoffset') THEN CAST(DATETIME_PRECISION AS NVARCHAR)
// 												                                                                                END  +')'
//                                               END
// 			    ELSE '[Bas].' + DOMAIN_NAME
//             END DataType
// 		  ,Sc.is_identity

// 	FROM INFORMATION_SCHEMA.COLUMNS C
// 	LEFT JOIN sys.columns Sc ON C.COLUMN_NAME = Sc.name AND OBJECT_ID(c.TABLE_SCHEMA + '.' + c.TABLE_NAME) = sc.object_id
// 	where C.TABLE_NAME not like 'ProductDiscount' and C.TABLE_NAME not like 'ProductImages'

//  {
//    "id": 1,
//    "entityName": "blog",
//    "persianDisplayName": "بلاگ",
//    "englishDisplayName": "Blog",
//    "endPoint": "blogs",
//    "entityIconBase64": "<svg width=\"13\" height=\"13\" viewBox=\"0 0 13 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.49967 4.33337C5.30306 4.33337 4.33301 5.30342 4.33301 6.50004C4.33301 7.69666 5.30306 8.66671 6.49967 8.66671C7.69629 8.66671 8.66634 7.69666 8.66634 6.50004C8.66634 5.30342 7.69629 4.33337 6.49967 4.33337Z\" stroke=\"#B1B1B1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
//    "columns": [
//      { "Header": "شناسه", "Accessor": "id", "Type": "number", "Options": ["Active", "Edit", "Delete"] },
//      { "Header": "عنوان فارسی", "Accessor": "titleFa", "Type": "text", "Options": ["Active", "Edit", "Delete"] },
//      { "Header": "عنوان انگلیسی", "Accessor": "titleEn", "Type": "text", "Options": ["Active", "Edit", "Delete"] },
//      { "Header": "محتوای فارسی", "Accessor": "contentFa", "Type": "textarea", "Options": ["Active", "Edit", "Delete"] },
//      { "Header": "محتوای انگلیسی", "Accessor": "contentEn", "Type": "textarea", "Options": ["Active", "Edit", "Delete"] },
//      { "Header": "اسلاگ", "Accessor": "slug", "Type": "text", "Options": ["Active", "Edit", "Delete"] },
//      { "Header": "تصویر شاخص", "Accessor": "thumbnailUrl", "Type": "image", "Options": ["Active", "Edit", "Delete"] },
//      { "Header": "شناسه نویسنده", "Accessor": "authorId", "Type": "number", "Options": ["Active", "Edit", "Delete"] }
//    ],
//    "actions": ["active", "edit", "delete"],
//    "isActive": true,
//    "formFields": [
//      {
//        "name": "title",
//        "caption": "عنوان بلاگ",
//        "type": "text",
//        "placeHolder": "عنوان مقاله را وارد کنید",
//        "help": "مثلاً: راهنمای خرید تلویزیون",
//        "order": 1,
//        "options": [],
//        "rules": [
//          { "rule": "required", "condition": "true", "message": "عنوان بلاگ الزامی است" }
//        ]
//      },
//      {
//        "name": "slug",
//        "caption": "نامک (Slug)",
//        "type": "text",
//        "placeHolder": "مثلاً: tv-buying-guide",
//        "help": "برای استفاده در URL",
//        "order": 2,
//        "options": [],
//        "rules": [
//          { "rule": "required", "condition": "true", "message": "نامک الزامی است" }
//        ]
//      },
//      {
//        "name": "categoryId",
//        "caption": "دسته‌بندی",
//        "type": "select",
//        "placeHolder": "دسته را انتخاب کنید",
//        "help": "",
//        "order": 3,
//        "options": ["اخبار", "راهنمای خرید", "آموزش", "نقد و بررسی"],
//        "rules": []
//      },
//      {
//        "name": "content",
//        "caption": "محتوا",
//        "type": "textarea",
//        "placeHolder": "محتوای مقاله را بنویسید...",
//        "help": "",
//        "order": 4,
//        "options": [],
//        "rules": [
//          { "rule": "minLength", "condition": "50", "message": "محتوا باید حداقل ۵۰ کاراکتر باشد" }
//        ]
//      },
//      {
//        "name": "isPublished",
//        "caption": "وضعیت انتشار",
//        "type": "checkbox",
//        "placeHolder": "",
//        "help": "",
//        "order": 5,
//        "options": ["منتشر شود"],
//        "rules": []
//      }
//    ]
//  }
// "formFields": [
//      {
//        "name": "userId",
//        "caption": "کاربر",
//        "type": "number",
//        "placeHolder": "کاربر مد نظر",
//        "help": "مثلاً:علی این نظر را داده",
//        "order": 1,
//        "options": [],
//        "rules": [
//          { "rule": "required", "condition": "true", "message": "کاربر الزامی است" }
//        ]
//      },
//      {
//        "name": "targetId",
//        "caption": "آیدی مورد نظر",
//        "type": "number",
//        "placeHolder": "مثلاً: از تایپ x منظور آیدی y هست",
//        "help": "با ترکیب آیدی و تایپ مشخص میکنیم از کدوم دسته بندی به کدوم آیدی داریم اشاره میکنیم ",
//        "order": 2,
//        "options": [],
//        "rules": [
//          { "rule": "required", "condition": "true", "message": "آیدی الزامی است" }
//        ]
//      },
//      {
//        "name": "targetType",
//        "caption": "دسته‌بندی مورد نظر",
//        "type": "",
//        "placeHolder": "دسته را انتخاب کنید",
//        "help": "",
//        "order": 3,
//        "options": ["اخبار", "راهنمای خرید", "آموزش", "نقد و بررسی"],
//        "rules": []
//      },
//      {
//        "name": "content",
//        "caption": "محتوا",
//        "type": "textarea",
//        "placeHolder": "نظر را بنویسید...",
//        "help": "",
//        "order": 4,
//        "options": [],
//        "rules": [
//          { "rule": "minLength", "condition": "50", "message": "محتوا باید حداقل ۵۰ کاراکتر باشد" }
//        ]
//      },
//      {
//        "name": "isApproved",
//        "caption": "قابل نمایش",
//        "type": "checkbox",
//        "placeHolder": "",
//        "help": "",
//        "order": 5,
//        "options": [],
//        "rules": []
//      },
//           {
//        "name": "parentId",
//        "caption": "ریپلای به",
//        "type": "",
//        "placeHolder": "بازخورد به نظر را انتخاب کنید",
//        "help": "",
//        "order": 3,
//        "options": [],
//        "rules": []
//      },
//    ]