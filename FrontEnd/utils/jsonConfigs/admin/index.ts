export const blogs = {
  "id": 2,
  "columnsJson": `[{"Header":"آیدی","Accessor":"id","Type":"number","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"عنوان","Accessor":"titleFa","Type":"text","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"Title","Accessor":"titleEn","Type":"text","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"محتوا","Accessor":"contentFa","Type":"textarea","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"Content","Accessor":"contentEn","Type":"textarea","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"Slug","Accessor":"slug","Type":"text","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"عکس","Accessor":"thumbnailFile","Type":"image","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"آیدی نویسنده","Accessor":"authorId","Type":"number","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]}]`,
  "actionsJson": `["active","edit","delete"]`,
  "isActive": false,
  "entityName": "blogs",
  "persianDisplayName": "بلاگ",
  "englishDisplayName": "Blog",
  "endPoint": "blogs",
  "entityIconBase64": "<svg width=\"13\" height=\"13\" viewBox=\"0 0 13 13\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.49967 4.33337C5.30306 4.33337 4.33301 5.30342 4.33301 6.50004C4.33301 7.69666 5.30306 8.66671 6.49967 8.66671C7.69629 8.66671 8.66634 7.69666 8.66634 6.50004C8.66634 5.30342 7.69629 4.33337 6.49967 4.33337Z\" stroke=\"#B1B1B1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "titleFa",
      "Caption": "عنوان فارسی",
      "Type": "text",
      "PlaceHolder": "عنوان مقاله را وارد کنید",
      "Help": "مثلاً: راهنمای خرید تلویزیون",
      "Rules": []
    },
    {
      "Name": "titleEn",
      "Caption": "عنوان انگلیسی",
      "Type": "text",
      "PlaceHolder": "Enter blog title",
      "Help": "Example: TV Buying Guide",
      "Rules": []
    },
    {
      "Name": "slug",
      "Caption": "نامک (Slug)",
      "Type": "text",
      "PlaceHolder": "مثلاً: tv-buying-guide",
      "Help": "برای استفاده در URL",
      "Rules": []
    },
    {
      "Name": "excerptFa",
      "Caption": "خلاصه فارسی",
      "Type": "textarea",
      "PlaceHolder": "خلاصه‌ای کوتاه از مقاله بنویسید...",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "excerptEn",
      "Caption": "خلاصه انگلیسی",
      "Type": "textarea",
      "PlaceHolder": "Write short excerpt...",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "contentFa",
      "Caption": "محتوای فارسی",
      "Type": "textarea",
      "PlaceHolder": "محتوای مقاله را بنویسید...",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "contentEn",
      "Caption": "محتوای انگلیسی",
      "Type": "textarea",
      "PlaceHolder": "Write the article content...",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "metaDescriptionFa",
      "Caption": "متا توضیحات فارسی",
      "Type": "text",
      "PlaceHolder": "توضیحات متای فارسی را وارد کنید",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "metaDescriptionEn",
      "Caption": "Meta Description (English)",
      "Type": "text",
      "PlaceHolder": "Enter English meta description",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "metaKeywordsFa",
      "Caption": "کلمات کلیدی فارسی",
      "Type": "text",
      "PlaceHolder": "کلمات کلیدی را با ویرگول جدا کنید",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "metaKeywordsEn",
      "Caption": "Meta Keywords (English)",
      "Type": "text",
      "PlaceHolder": "Separate keywords with commas",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "thumbnailFile",
      "Caption": "تصویر بندانگشتی",
      "Type": "file",
      "PlaceHolder": "آدرس تصویر بندانگشتی را وارد کنید",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "publishedDate",
      "Caption": "تاریخ انتشار",
      "Type": "date",
      "PlaceHolder": "تاریخ انتشار را وارد کنید",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "updatedDate",
      "Caption": "تاریخ بروزرسانی",
      "Type": "date",
      "PlaceHolder": "تاریخ بروزرسانی را وارد کنید",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "authorId",
      "Caption": "شناسه نویسنده",
      "Type": "text",
      "PlaceHolder": "شناسه نویسنده را وارد کنید",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "isPublished",
      "Caption": "وضعیت انتشار",
      "Type": "checkbox",
      "PlaceHolder": "",
      "Help": "",
      "Rules": []
    }
  ]`
};
export const brands = {
  "columnsJson": `[{
    "Header": "شناسه",
    "Accessor": "id",
    "Type": "number",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active", "Edit", "Delete"]
  },{
    "Header": "نام برند",
    "Accessor": "name",
    "Type": "text",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active", "Edit", "Delete"]
  },{
    "Header": "لوگو",
    "Accessor": "logoFile",
    "Type": "image",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active", "Edit", "Delete"]
  },{
    "Header": "توضیحات",
    "Accessor": "description",
    "Type": "textarea",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active", "Edit", "Delete"]
  }]`,
  "actionsJson": `["active","edit","delete"]`,
  "isActive": true,
  "entityName": "brands",
  "persianDisplayName": "برندها",
  "englishDisplayName": "Brand",
  "endPoint": "brands",
  "entityIconBase64": "111",
  "formFieldsJson": `[
    {
      "Name": "name",
      "Caption": "نام برند",
      "Type": "text",
      "PlaceHolder": "مثلاً: سامسونگ",
      "Help": "نام برند را وارد کنید",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام برند الزامی است" },
        { "Rule": "minLength", "Condition": "2", "Message": "حداقل دو کاراکتر وارد کنید" }
      ]
    },
    {
      "Name": "logoFile",
      "Caption": "لوگو",
      "Type": "file",
      "PlaceHolder": "لوگوی برند را انتخاب کنید",
      "Help": "فرمت‌های مجاز: jpg, png, svg",
      "Rules": []
    },
    {
      "Name": "description",
      "Caption": "توضیحات",
      "Type": "textarea",
      "PlaceHolder": "توضیح کوتاهی درباره برند بنویسید...",
      "Help": "",
      "Rules": []
    },
    {
      "Name": "isActive",
      "Caption": "وضعیت",
      "Type": "checkbox",
      "PlaceHolder": "",
      "Help": "در صورت غیرفعال بودن برند در لیست نمایش داده نمی‌شود",
      "Rules": []
    }
  ]`
};
export const categories = {
  "id": 6,
  "columnsJson": `[{
    "Header": "شناسه",
    "Accessor": "id",
    "Type": "number",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active", "Edit", "Delete"]
  },{
    "Header": "نام دسته‌بندی",
    "Accessor": "name",
    "Type": "text",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active", "Edit", "Delete"]
  },{
    "Header": "دسته والد",
    "Accessor": "parentCategoryId",
    "Type": "number",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active", "Edit", "Delete"]
  },{
    "Header": "تاریخ ایجاد",
    "Accessor": "createdAt",
    "Type": "date",
    "Sortable": false,
    "Filterable": false,
    "Options": []
  }]`,
  "actionsJson": `["active","edit","delete"]`,
  "isActive": true,
  "entityName": "categories",
  "persianDisplayName": "دسته‌بندی‌ها",
  "englishDisplayName": "Category",
  "endPoint": "categories",
  "entityIconBase64": "111",
  "formFieldsJson": `[
    {
      "Name": "name",
      "Caption": "نام دسته‌بندی",
      "Type": "text",
      "PlaceHolder": "مثلاً: تلویزیون",
      "Help": "نام دسته را وارد کنید",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام دسته‌بندی الزامی است" },
        { "Rule": "minLength", "Condition": "2", "Message": "حداقل دو کاراکتر وارد کنید" }
      ]
    },
    {
      "Name": "parentCategoryId",
      "Caption": "دسته والد",
      "Type": "select",
      "PlaceHolder": "در صورت وجود، دسته والد را انتخاب کنید",
      "Help": "می‌توانید این دسته را به عنوان زیرمجموعه یک دسته دیگر تعیین کنید",
      "Rules": [],
      "OptionsSource": "categories"
    },
    {
      "Name": "isActive",
      "Caption": "وضعیت",
      "Type": "checkbox",
      "PlaceHolder": "",
      "Help": "در صورت غیرفعال بودن، دسته‌بندی در لیست نمایش داده نمی‌شود",
      "Rules": []
    }
  ]`
};
export const discounts = {
  "id": 11,
  "columnsJson": `[{
    "Header": "شناسه",
    "Accessor": "id",
    "Type": "number",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active","Edit","Delete"]
  },{
    "Header": "عنوان تخفیف",
    "Accessor": "title",
    "Type": "text",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active","Edit","Delete"]
  },{
    "Header": "مقدار تخفیف",
    "Accessor": "amount",
    "Type": "number",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active","Edit","Delete"]
  },{
    "Header": "درصدی؟",
    "Accessor": "isPercent",
    "Type": "checkbox",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active","Edit","Delete"]
  },{
    "Header": "تاریخ شروع",
    "Accessor": "startDate",
    "Type": "date",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active","Edit","Delete"]
  },{
    "Header": "تاریخ پایان",
    "Accessor": "endDate",
    "Type": "date",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active","Edit","Delete"]
  },{
    "Header": "وضعیت فعال",
    "Accessor": "isActive",
    "Type": "badge",
    "Sortable": false,
    "Filterable": false,
    "Options": ["Active","Edit","Delete"]
  }]`,
  "actionsJson": `["active","edit","delete"]`,
  "isActive": true,
  "entityName": "discounts",
  "persianDisplayName": "تخفیف‌ها",
  "englishDisplayName": "Discount",
  "endPoint": "discounts",
  "entityIconBase64": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" className="stroke-primary">
<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h.008v.008H7.5V7.5Zm9 9h.008v.008H16.5V16.5ZM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Zm4.5-4.5 9 9" />
</svg>`,
  "formFieldsJson": `[
    {
      "Name": "title",
      "Caption": "عنوان تخفیف",
      "Type": "text",
      "PlaceHolder": "مثلاً: تخفیف تابستانی",
      "Help": "نام نمایشی برای تخفیف",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "عنوان تخفیف الزامی است" }
      ]
    },
    {
      "Name": "amount",
      "Caption": "مقدار تخفیف",
      "Type": "number",
      "PlaceHolder": "مثلاً: 15",
      "Help": "عدد تخفیف به تومان یا درصد",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "مقدار تخفیف الزامی است" },
        { "Rule": "min", "Condition": "1", "Message": "مقدار باید بزرگ‌تر از صفر باشد" }
      ]
    },
    {
      "Name": "isPercent",
      "Caption": "آیا تخفیف درصدی است؟",
      "Type": "checkbox",
      "PlaceHolder": "",
      "Help": "در صورت فعال بودن، مقدار تخفیف برحسب درصد است",
      "Rules": []
    },
    {
      "Name": "startDate",
      "Caption": "تاریخ شروع تخفیف",
      "Type": "date",
      "PlaceHolder": "",
      "Help": "تاریخی که تخفیف از آن فعال می‌شود",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "تاریخ شروع الزامی است" }
      ]
    },
    {
      "Name": "endDate",
      "Caption": "تاریخ پایان تخفیف",
      "Type": "date",
      "PlaceHolder": "",
      "Help": "تاریخی که تخفیف تا آن معتبر است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "تاریخ پایان الزامی است" }
      ]
    },
    {
      "Name": "isActive",
      "Caption": "فعال باشد؟",
      "Type": "checkbox",
      "PlaceHolder": "",
      "Help": "برای فعال/غیرفعال کردن وضعیت تخفیف",
      "Rules": []
    }
  ]`
};
export const products = {
  "id": 13,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام محصول\",\"Accessor\":\"name\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت\",\"Accessor\":\"price\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"موجودی\",\"Accessor\":\"inventory\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"دسته‌بندی\",\"Accessor\":\"categoryId\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"برند\",\"Accessor\":\"brandId\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"توضیحات\",\"Accessor\":\"description\",\"Type\":\"textarea\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "products",
  "persianDisplayName": "محصولات",
  "englishDisplayName": "Products",
  "endPoint": "products",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3z\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "name",
      "Caption": "نام محصول",
      "Type": "text",
      "PlaceHolder": "نام محصول را وارد کنید",
      "Help": "مثلاً: تلویزیون سامسونگ 55 اینچ",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام محصول الزامی است" }
      ]
    },
    {
      "Name": "description",
      "Caption": "توضیحات",
      "Type": "textarea",
      "PlaceHolder": "توضیحات محصول را وارد کنید",
      "Help": "می‌توانید ویژگی‌ها و مشخصات محصول را بنویسید",
      "Rules": []
    },
    {
      "Name": "price",
      "Caption": "قیمت",
      "Type": "number",
      "PlaceHolder": "قیمت محصول را وارد کنید",
      "Help": "به تومان",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "قیمت محصول الزامی است" },
        { "Rule": "min", "Condition": "0", "Message": "قیمت نمی‌تواند منفی باشد" }
      ]
    },
    {
      "Name": "inventory",
      "Caption": "موجودی",
      "Type": "number",
      "PlaceHolder": "تعداد موجودی را وارد کنید",
      "Help": "تعداد محصول در انبار",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "موجودی الزامی است" },
        { "Rule": "min", "Condition": "0", "Message": "موجودی نمی‌تواند منفی باشد" }
      ]
    },
    {
      "Name": "categoryId",
      "Caption": "دسته‌بندی",
      "Type": "select",
      "PlaceHolder": "دسته‌بندی محصول را انتخاب کنید",
      "Help": "محصول به کدام دسته تعلق دارد",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "دسته‌بندی الزامی است" }
      ]
    },
    {
      "Name": "brandId",
      "Caption": "برند",
      "Type": "select",
      "PlaceHolder": "برند محصول را انتخاب کنید",
      "Help": "می‌تواند خالی باشد",
      "Rules": []
    },
    {
      "Name": "images",
      "Caption": "تصاویر محصول",
      "Type": "fileMultiple",
      "PlaceHolder": "تصاویر محصول را آپلود کنید",
      "Help": "می‌توانید چند تصویر اضافه کنید",
      "Rules": []
    },
    {
      "Name": "productTags",
      "Caption": "تگ‌ها",
      "Type": "tags",
      "PlaceHolder": "تگ‌های محصول را انتخاب کنید",
      "Help": "برای جستجو و فیلتر بهتر",
      "Rules": []
    }
  ]`
};
export const tags = {
  "id": 14,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام تگ\",\"Accessor\":\"name\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "tags",
  "persianDisplayName": "تگ‌ها",
  "englishDisplayName": "Tags",
  "endPoint": "tags",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M7 7h10v10H7V7z\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "name",
      "Caption": "نام تگ",
      "Type": "text",
      "PlaceHolder": "نام تگ را وارد کنید",
      "Help": "مثلاً: تلویزیون، گوشی، لپ‌تاپ",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام تگ الزامی است" }
      ]
    }
  ]`
};
export const users = {
  "id": 15,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام کامل\",\"Accessor\":\"fullName\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"ایمیل\",\"Accessor\":\"email\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شماره تماس\",\"Accessor\":\"phoneNumber\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نقش\",\"Accessor\":\"roleId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "users",
  "persianDisplayName": "کاربران",
  "englishDisplayName": "Users",
  "endPoint": "users",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "fullName",
      "Caption": "نام کامل",
      "Type": "text",
      "PlaceHolder": "نام و نام خانوادگی را وارد کنید",
      "Help": "مثلاً: محمد رضایی",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام کامل الزامی است" }
      ]
    },
    {
      "Name": "email",
      "Caption": "ایمیل",
      "Type": "text",
      "PlaceHolder": "example@gmail.com",
      "Help": "آدرس ایمیل معتبر وارد کنید",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "ایمیل الزامی است" },
        { "Rule": "email", "Condition": "true", "Message": "ایمیل نامعتبر است" }
      ]
    },
    {
      "Name": "phoneNumber",
      "Caption": "شماره تماس",
      "Type": "text",
      "PlaceHolder": "09123456789",
      "Help": "شماره موبایل را بدون فاصله وارد کنید",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شماره تماس الزامی است" }
      ]
    },
    {
      "Name": "password",
      "Caption": "رمز عبور",
      "Type": "password",
      "PlaceHolder": "رمز عبور را وارد کنید",
      "Help": "حداقل ۸ کاراکتر",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "رمز عبور الزامی است" },
        { "Rule": "minLength", "Condition": "8", "Message": "رمز عبور باید حداقل ۸ کاراکتر باشد" }
      ]
    },
    {
      "Name": "roleId",
      "Caption": "نقش",
      "Type": "select",
      "PlaceHolder": "نقش کاربر را انتخاب کنید",
      "Help": "مثلاً: Admin, Customer",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نقش الزامی است" }
      ]
    }
  ]`
};
export const userAddresses = {
  "id": 16,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه کاربر\",\"Accessor\":\"userId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شهر\",\"Accessor\":\"city\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"استان\",\"Accessor\":\"state\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"کد پستی\",\"Accessor\":\"postalCode\",\"Type\":\"text\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"آدرس کامل\",\"Accessor\":\"fullAddress\",\"Type\":\"textarea\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"پیش‌فرض\",\"Accessor\":\"isDefault\",\"Type\":\"checkbox\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "userAddresses",
  "persianDisplayName": "آدرس کاربران",
  "englishDisplayName": "User Addresses",
  "endPoint": "userAddresses",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "userId",
      "Caption": "شناسه کاربر",
      "Type": "text",
      "PlaceHolder": "شناسه کاربر را وارد کنید",
      "Help": "شناسه کاربری که این آدرس به آن تعلق دارد",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه کاربر الزامی است" }
      ]
    },
    {
      "Name": "city",
      "Caption": "شهر",
      "Type": "text",
      "PlaceHolder": "نام شهر",
      "Help": "مثلاً: تهران",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام شهر الزامی است" }
      ]
    },
    {
      "Name": "state",
      "Caption": "استان",
      "Type": "text",
      "PlaceHolder": "نام استان",
      "Help": "مثلاً: تهران",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام استان الزامی است" }
      ]
    },
    {
      "Name": "postalCode",
      "Caption": "کد پستی",
      "Type": "text",
      "PlaceHolder": "کد پستی را وارد کنید",
      "Help": "مثلاً: 1234567890",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "کد پستی الزامی است" }
      ]
    },
    {
      "Name": "fullAddress",
      "Caption": "آدرس کامل",
      "Type": "textarea",
      "PlaceHolder": "آدرس کامل را وارد کنید",
      "Help": "مثلاً: خیابان آزادی، پلاک 12",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "آدرس کامل الزامی است" }
      ]
    },
    {
      "Name": "isDefault",
      "Caption": "پیش‌فرض",
      "Type": "checkbox",
      "PlaceHolder": "",
      "Help": "این آدرس به عنوان آدرس پیش‌فرض انتخاب شود",
      "Rules": []
    }
  ]`
};
export const carts = {
  "id": 17,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه کاربر\",\"Accessor\":\"userId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"وضعیت\",\"Accessor\":\"status\",\"Type\":\"select\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Checkout\",\"Paid\",\"Cancelled\"]},{\"Header\":\"تعداد آیتم‌ها\",\"Accessor\":\"itemsCount\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت کل\",\"Accessor\":\"totalPrice\",\"Type\":\"decimal\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "carts",
  "persianDisplayName": "سبد خرید",
  "englishDisplayName": "Cart",
  "endPoint": "carts",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7H19M7 13l-1.5 7M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "userId",
      "Caption": "شناسه کاربر",
      "Type": "text",
      "PlaceHolder": "شناسه کاربر را وارد کنید",
      "Help": "سبد خرید متعلق به این کاربر است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه کاربر الزامی است" }
      ]
    },
    {
      "Name": "status",
      "Caption": "وضعیت سبد",
      "Type": "select",
      "PlaceHolder": "انتخاب وضعیت",
      "Help": "وضعیت فعلی سبد خرید",
      "Options": ["Active", "Checkout", "Paid", "Cancelled"],
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "وضعیت سبد الزامی است" }
      ]
    }
  ]`
};
export const orders = {
  "id": 18,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه کاربر\",\"Accessor\":\"userId\",\"Type\":\"number\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"وضعیت\",\"Accessor\":\"status\",\"Type\":\"select\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Pending\",\"Confirmed\",\"Paid\",\"Shipped\",\"Delivered\",\"Cancelled\"]},{\"Header\":\"تاریخ سفارش\",\"Accessor\":\"orderDate\",\"Type\":\"date\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت کل\",\"Accessor\":\"totalPrice\",\"Type\":\"decimal\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت نهایی\",\"Accessor\":\"finalPrice\",\"Type\":\"decimal\",\"Sortable\":false,\"Filterable\":false,\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "orders",
  "persianDisplayName": "سفارش‌ها",
  "englishDisplayName": "Order",
  "endPoint": "orders",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3zM3 7h18M7 3v18\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "userId",
      "Caption": "شناسه کاربر",
      "Type": "text",
      "PlaceHolder": "شناسه کاربر را وارد کنید",
      "Help": "سفارش متعلق به این کاربر است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه کاربر الزامی است" }
      ]
    },
    {
      "Name": "status",
      "Caption": "وضعیت سفارش",
      "Type": "select",
      "PlaceHolder": "انتخاب وضعیت",
      "Help": "وضعیت فعلی سفارش",
      "Options": ["Pending","Confirmed","Paid","Shipped","Delivered","Cancelled"],
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "وضعیت سفارش الزامی است" }
      ]
    },
    {
      "Name": "shippingAddressId",
      "Caption": "آدرس ارسال",
      "Type": "text",
      "PlaceHolder": "شناسه آدرس را وارد کنید",
      "Help": "آدرس ارسال سفارش",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "آدرس ارسال الزامی است" }
      ]
    },
    {
      "Name": "shippingMethod",
      "Caption": "روش ارسال",
      "Type": "select",
      "PlaceHolder": "انتخاب روش ارسال",
      "Help": "روش ارسال سفارش",
      "Options": ["Post","Courier","InPlace"]
    },
    {
      "Name": "paymentMethod",
      "Caption": "روش پرداخت",
      "Type": "select",
      "PlaceHolder": "انتخاب روش پرداخت",
      "Help": "روش پرداخت سفارش",
      "Options": ["Online","Cash","CardOnDelivery"]
    },
    {
      "Name": "shippingCost",
      "Caption": "هزینه ارسال",
      "Type": "decimal",
      "PlaceHolder": "مقدار هزینه ارسال",
      "Help": "هزینه ارسال سفارش"
    },
    {
      "Name": "discountAmount",
      "Caption": "مقدار تخفیف",
      "Type": "decimal",
      "PlaceHolder": "مقدار تخفیف را وارد کنید",
      "Help": "تخفیف کل سفارش"
    },
    {
      "Name": "trackingCode",
      "Caption": "کد رهگیری",
      "Type": "text",
      "PlaceHolder": "کد رهگیری را وارد کنید",
      "Help": "کد رهگیری پستی یا باربری"
    }
  ]`
};
export const cartItems = {
  "id": 19,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه سبد خرید\",\"Accessor\":\"cartId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تعداد\",\"Accessor\":\"quantity\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "cartItems",
  "persianDisplayName": "آیتم‌های سبد خرید",
  "englishDisplayName": "CartItem",
  "endPoint": "cart-items",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3zM7 3v18\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "cartId",
      "Caption": "شناسه سبد خرید",
      "Type": "text",
      "PlaceHolder": "شناسه سبد خرید را وارد کنید",
      "Help": "این آیتم متعلق به این سبد خرید است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه سبد خرید الزامی است" }
      ]
    },
    {
      "Name": "productId",
      "Caption": "محصول",
      "Type": "text",
      "PlaceHolder": "شناسه محصول را وارد کنید",
      "Help": "محصولی که به سبد اضافه شده است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه محصول الزامی است" }
      ]
    },
    {
      "Name": "quantity",
      "Caption": "تعداد",
      "Type": "number",
      "PlaceHolder": "تعداد محصول را وارد کنید",
      "Help": "تعداد واحدهای این محصول در سبد",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "تعداد الزامی است" },
        { "Rule": "min", "Condition": "1", "Message": "تعداد باید حداقل 1 باشد" }
      ]
    }
  ]`
};
export const orderItems = {
  "id": 20,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه سفارش\",\"Accessor\":\"orderId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تعداد\",\"Accessor\":\"quantity\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت واحد\",\"Accessor\":\"unitPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تخفیف\",\"Accessor\":\"discountAmount\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت نهایی واحد\",\"Accessor\":\"finalUnitPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت کل\",\"Accessor\":\"totalPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "orderItems",
  "persianDisplayName": "آیتم‌های سفارش",
  "englishDisplayName": "OrderItem",
  "endPoint": "order-items",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3zM7 3v18\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "orderId",
      "Caption": "شناسه سفارش",
      "Type": "text",
      "PlaceHolder": "شناسه سفارش را وارد کنید",
      "Help": "این آیتم متعلق به کدام سفارش است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه سفارش الزامی است" }
      ]
    },
    {
      "Name": "productId",
      "Caption": "محصول",
      "Type": "text",
      "PlaceHolder": "شناسه محصول را وارد کنید",
      "Help": "محصولی که به سفارش اضافه شده است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه محصول الزامی است" }
      ]
    },
    {
      "Name": "quantity",
      "Caption": "تعداد",
      "Type": "number",
      "PlaceHolder": "تعداد محصول را وارد کنید",
      "Help": "تعداد واحدهای محصول در این سفارش",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "تعداد الزامی است" },
        { "Rule": "min", "Condition": "1", "Message": "تعداد باید حداقل 1 باشد" }
      ]
    },
    {
      "Name": "unitPrice",
      "Caption": "قیمت واحد",
      "Type": "decimal",
      "PlaceHolder": "قیمت واحد محصول",
      "Help": "قیمت محصول قبل از تخفیف",
      "Rules": []
    },
    {
      "Name": "discountAmount",
      "Caption": "تخفیف",
      "Type": "decimal",
      "PlaceHolder": "میزان تخفیف",
      "Help": "مقدار تخفیف اعمال شده روی این محصول",
      "Rules": []
    },
    {
      "Name": "finalUnitPrice",
      "Caption": "قیمت نهایی واحد",
      "Type": "decimal",
      "PlaceHolder": "قیمت نهایی واحد",
      "Help": "قیمت واحد بعد از اعمال تخفیف",
      "Rules": []
    },
    {
      "Name": "totalPrice",
      "Caption": "قیمت کل",
      "Type": "decimal",
      "PlaceHolder": "قیمت کل آیتم",
      "Help": "قیمت کل این آیتم = قیمت نهایی واحد × تعداد",
      "Rules": []
    }
  ]`
};
export const payments = {
  "id": 21,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"سفارش\",\"Accessor\":\"orderId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تاریخ پرداخت\",\"Accessor\":\"paymentDate\",\"Type\":\"datetime\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"مبلغ\",\"Accessor\":\"amount\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"روش پرداخت\",\"Accessor\":\"paymentMethod\",\"Type\":\"enum\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"وضعیت\",\"Accessor\":\"status\",\"Type\":\"enum\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه تراکنش\",\"Accessor\":\"transactionId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "payments",
  "persianDisplayName": "پرداخت‌ها",
  "englishDisplayName": "Payment",
  "endPoint": "payments",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 1v22M1 12h22\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "orderId",
      "Caption": "شناسه سفارش",
      "Type": "text",
      "PlaceHolder": "شناسه سفارش را وارد کنید",
      "Help": "این پرداخت مربوط به کدام سفارش است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "شناسه سفارش الزامی است" }
      ]
    },
    {
      "Name": "amount",
      "Caption": "مبلغ",
      "Type": "decimal",
      "PlaceHolder": "مبلغ پرداخت را وارد کنید",
      "Help": "مبلغ پرداخت شده توسط مشتری",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "مبلغ الزامی است" },
        { "Rule": "min", "Condition": "0.01", "Message": "مبلغ باید بزرگتر از صفر باشد" }
      ]
    },
    {
      "Name": "paymentMethod",
      "Caption": "روش پرداخت",
      "Type": "enum",
      "PlaceHolder": "روش پرداخت را انتخاب کنید",
      "Help": "روش پرداخت: آنلاین یا نقدی",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "روش پرداخت الزامی است" }
      ]
    },
    {
      "Name": "status",
      "Caption": "وضعیت",
      "Type": "enum",
      "PlaceHolder": "وضعیت پرداخت",
      "Help": "وضعیت پرداخت: Pending, Success, Failed, Cancelled",
      "Rules": []
    },
    {
      "Name": "transactionId",
      "Caption": "شناسه تراکنش",
      "Type": "text",
      "PlaceHolder": "شناسه تراکنش را وارد کنید",
      "Help": "شناسه تراکنش پرداخت آنلاین",
      "Rules": []
    },
    {
      "Name": "paymentDate",
      "Caption": "تاریخ پرداخت",
      "Type": "datetime",
      "PlaceHolder": "تاریخ و زمان پرداخت",
      "Help": "تاریخ انجام پرداخت",
      "Rules": []
    }
  ]`
};
export const roles = {
  "id": 22,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام نقش\",\"Accessor\":\"roleName\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "roles",
  "persianDisplayName": "نقش‌ها",
  "englishDisplayName": "Role",
  "endPoint": "roles",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "roleName",
      "Caption": "نام نقش",
      "Type": "text",
      "PlaceHolder": "نام نقش را وارد کنید",
      "Help": "مثلاً: مدیر، مشتری، فروشنده",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "نام نقش الزامی است" },
        { "Rule": "minLength", "Condition": "2", "Message": "نام نقش باید حداقل ۲ کاراکتر باشد" }
      ]
    }
  ]`
};
export const productDiscounts = {
  "id": 23,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تخفیف\",\"Accessor\":\"discountId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "productDiscounts",
  "persianDisplayName": "تخفیف محصولات",
  "englishDisplayName": "ProductDiscount",
  "endPoint": "productDiscounts",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2l3 7H9l3-7zM12 22a10 10 0 100-20 10 10 0 000 20z\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "productId",
      "Caption": "محصول",
      "Type": "select",
      "PlaceHolder": "محصول را انتخاب کنید",
      "Help": "انتخاب محصول برای تخفیف",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "انتخاب محصول الزامی است" }
      ]
    },
    {
      "Name": "discountId",
      "Caption": "تخفیف",
      "Type": "select",
      "PlaceHolder": "تخفیف را انتخاب کنید",
      "Help": "انتخاب تخفیف برای محصول",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "انتخاب تخفیف الزامی است" }
      ]
    }
  ]`
};
export const productImages = {
  "id": 24,
  "columnsJson": "[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تصویر\",\"Accessor\":\"imageUrl\",\"Type\":\"image\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"اصلی\",\"Accessor\":\"isMain\",\"Type\":\"checkbox\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]",
  "actionsJson": "[\"active\",\"edit\",\"delete\"]",
  "isActive": true,
  "entityName": "productImages",
  "persianDisplayName": "تصاویر محصول",
  "englishDisplayName": "ProductImage",
  "endPoint": "productImages",
  "entityIconBase64": "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM3 9l4 4 3-3 5 5 4-4\"/></svg>",
  "formFieldsJson": `[
    {
      "Name": "productId",
      "Caption": "محصول",
      "Type": "select",
      "PlaceHolder": "محصول را انتخاب کنید",
      "Help": "تصویر برای کدام محصول است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "انتخاب محصول الزامی است" }
      ]
    },
    {
      "Name": "imageUrl",
      "Caption": "آدرس تصویر",
      "Type": "file",
      "PlaceHolder": "آدرس تصویر را وارد کنید",
      "Help": "تصویر محصول را آپلود کنید",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "وارد کردن تصویر الزامی است" }
      ]
    },
    {
      "Name": "isMain",
      "Caption": "تصویر اصلی",
      "Type": "checkbox",
      "PlaceHolder": "",
      "Help": "آیا این تصویر اصلی محصول است؟",
      "Rules": []
    }
  ]`
};
export const productTags = {
  "id": 25,
  "columnsJson": `[{"Header":"شناسه","Accessor":"id","Type":"number","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"محصول","Accessor":"productId","Type":"select","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]},{"Header":"تگ","Accessor":"tagId","Type":"select","Sortable":false,"Filterable":false,"Options":["Active","Edit","Delete"]}]`,
  "actionsJson": `["active","edit","delete"]`,
  "isActive": true,
  "entityName": "productTags",
  "persianDisplayName": "تگ‌های محصول",
  "englishDisplayName": "ProductTag",
  "endPoint": "productTags",
  "entityIconBase64": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h10M7 12h10M7 17h10"/></svg>`,
  "formFieldsJson": `[
    {
      "Name": "productId",
      "Caption": "محصول",
      "Type": "select",
      "PlaceHolder": "محصول را انتخاب کنید",
      "Help": "تگ مربوط به کدام محصول است",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "انتخاب محصول الزامی است" }
      ]
    },
    {
      "Name": "tagId",
      "Caption": "تگ",
      "Type": "select",
      "PlaceHolder": "تگ را انتخاب کنید",
      "Help": "کدام تگ را به محصول اضافه می‌کنید",
      "Rules": [
        { "Rule": "required", "Condition": "true", "Message": "انتخاب تگ الزامی است" }
      ]
    }
  ]`
};

// SELECT TOP (1000) [Id]
//       ,[EntityName]
//       ,[PersianDisplayName]
//       ,[EnglishDisplayName]
//       ,[EndPoint]
//       ,[EntityIconBase64]
//       ,[ActionsJson]
//       ,[ColumnsJson]
//       ,[CreatedAt]
//       ,[UpdatedAt]
//       ,[DeletedAt]
//       ,[IsDeleted]
//       ,[CreatedBy]
//       ,[UpdatedBy]
//       ,[DeletedBy]
//       ,[IsActive]
//       ,[FormFieldsJson]
//   FROM [Falahi].[dbo].[EntityConfig]



// Id	EntityName	PersianDisplayName	EnglishDisplayName	EndPoint	EntityIconBase64	ActionsJson	ColumnsJson	CreatedAt	UpdatedAt	DeletedAt	IsDeleted	CreatedBy	UpdatedBy	DeletedBy	IsActive	FormFieldsJson
// 1	blogs	بلاگ	Blog	blogs	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" className="stroke-primary" >
// <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
// </svg>	["active","edit","delete"]	[{"Header":"\u0634\u0646\u0627\u0633\u0647","Accessor":"id","Type":"number","Options":["Active","Edit", "Delete"]},{"Header":"\u0639\u0646\u0648\u0627\u0646 \u0641\u0627\u0631\u0633\u06CC","Accessor":"titleFa","Type":"text","Options":["Active","Edit", "Delete"]},{"Header":"\u0639\u0646\u0648\u0627\u0646 \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Accessor":"titleEn","Type":"text","Options":["Active","Edit", "Delete"]},{"Header":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0641\u0627\u0631\u0633\u06CC","Accessor":"contentFa","Type":"textarea","Options":["Active","Edit", "Delete"]},{"Header":"\u0645\u062D\u062A\u0648\u0627\u06CC \u0627\u0646\u06AF\u0644\u06CC\u0633\u06CC","Accessor":"contentEn","Type":"textarea","Options":["Active","Edit", "Delete"]},{"Header":"\u0627\u0633\u0644\u0627\u06AF","Accessor":"slug","Type":"text","Options":["Active","Edit", "Delete"]},{"Header":"\u062A\u0635\u0648\u06CC\u0631 \u0634\u0627\u062E\u0635","Accessor":"thumbnailFile","Type":"image","Options":["Active","Edit", "Delete"]}]	2025-10-05 09:01:22.7799807	2025-10-06 10:11:14.6294886	NULL	0	1	1	NULL	1	[
//   {
//     "Name": "titleFa",
//     "Caption": "عنوان فارسی",
//     "Type": "text",
//     "PlaceHolder": "عنوان مقاله را وارد کنید",
//     "Help": "مثلاً: راهنمای خرید تلویزیون",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "عنوان فارسی الزامی است" }
//     ]
//   },
//   {
//     "Name": "titleEn",
//     "Caption": "عنوان انگلیسی",
//     "Type": "text",
//     "PlaceHolder": "Enter blog title",
//     "Help": "Example: TV Buying Guide",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "English title is required" }
//     ]
//   },
//   {
//     "Name": "slug",
//     "Caption": "نامک (Slug)",
//     "Type": "text",
//     "PlaceHolder": "مثلاً: tv-buying-guide",
//     "Help": "برای استفاده در URL",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "نامک الزامی است" }
//     ]
//   },
//   {
//     "Name": "excerptFa",
//     "Caption": "خلاصه فارسی",
//     "Type": "textarea",
//     "PlaceHolder": "خلاصه‌ای کوتاه از مقاله بنویسید...",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "excerptEn",
//     "Caption": "خلاصه انگلیسی",
//     "Type": "textarea",
//     "PlaceHolder": "Write short excerpt...",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "contentFa",
//     "Caption": "محتوای فارسی",
//     "Type": "textarea",
//     "PlaceHolder": "محتوای مقاله را بنویسید...",
//     "Help": "",
//     "Rules": [
//       { "Rule": "minLength", "Condition": "50", "Message": "محتوا باید حداقل ۵۰ کاراکتر باشد" }
//     ]
//   },
//   {
//     "Name": "contentEn",
//     "Caption": "محتوای انگلیسی",
//     "Type": "textarea",
//     "PlaceHolder": "Write the article content...",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "metaDescriptionFa",
//     "Caption": "متا توضیحات فارسی",
//     "Type": "text",
//     "PlaceHolder": "توضیحات متای فارسی را وارد کنید",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "metaDescriptionEn",
//     "Caption": "Meta Description (English)",
//     "Type": "text",
//     "PlaceHolder": "Enter English meta description",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "metaKeywordsFa",
//     "Caption": "کلمات کلیدی فارسی",
//     "Type": "text",
//     "PlaceHolder": "کلمات کلیدی را با ویرگول جدا کنید",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "metaKeywordsEn",
//     "Caption": "Meta Keywords (English)",
//     "Type": "text",
//     "PlaceHolder": "Separate keywords with commas",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "thumbnailFile",
//     "Caption": "تصویر بندانگشتی",
//     "Type": "file",
//     "PlaceHolder": "آدرس تصویر بندانگشتی را وارد کنید",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "publishedDate",
//     "Caption": "تاریخ انتشار",
//     "Type": "date",
//     "PlaceHolder": "تاریخ انتشار را وارد کنید",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "updatedDate",
//     "Caption": "تاریخ بروزرسانی",
//     "Type": "date",
//     "PlaceHolder": "تاریخ بروزرسانی را وارد کنید",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "authorId",
//     "Caption": "شناسه نویسنده",
//     "Type": "text",
//     "PlaceHolder": "شناسه نویسنده را وارد کنید",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "isActive",
//     "Caption": "وضعیت",
//     "Type": "checkbox",
//     "PlaceHolder": "",
//     "Help": "",
//     "Rules": []
//   }
// ]
// 5	brands	برندها	Brand	brands	111	["active", "edit", "delete"]	[
//   {
//     "Header": "شناسه",
//     "Accessor": "id",
//     "Type": "number",
//     "Options": ["Active", "Edit", "Delete"]
//   },
//   {
//     "Header": "نام برند",
//     "Accessor": "name",
//     "Type": "text",
//     "Options": ["Active", "Edit", "Delete"]
//   },
//   {
//     "Header": "لوگو",
//     "Accessor": "logoUrl",
//     "Type": "image",
//     "Options": ["Active", "Edit", "Delete"]
//   },
//   {
//     "Header": "توضیحات",
//     "Accessor": "description",
//     "Type": "textarea",
//     "Options": ["Active", "Edit", "Delete"]
//   }
// ]
// 	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//   {
//     "Name": "name",
//     "Caption": "نام برند",
//     "Type": "text",
//     "PlaceHolder": "مثلاً: سامسونگ",
//     "Help": "نام برند را وارد کنید",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "نام برند الزامی است" },
//       { "Rule": "minLength", "Condition": "2", "Message": "حداقل دو کاراکتر وارد کنید" }
//     ]
//   },
//   {
//     "Name": "logoUrl",
//     "Caption": "لوگو",
//     "Type": "file",
//     "PlaceHolder": "لوگوی برند را انتخاب کنید",
//     "Help": "فرمت‌های مجاز: jpg, png, svg",
//     "Rules": []
//   },
//   {
//     "Name": "description",
//     "Caption": "توضیحات",
//     "Type": "textarea",
//     "PlaceHolder": "توضیح کوتاهی درباره برند بنویسید...",
//     "Help": "",
//     "Rules": []
//   },
//   {
//     "Name": "isActive",
//     "Caption": "وضعیت",
//     "Type": "checkbox",
//     "PlaceHolder": "",
//     "Help": "در صورت غیرفعال بودن برند در لیست نمایش داده نمی‌شود",
//     "Rules": []
//   }
// ]
// 6	categories	دسته‌بندی‌ها	Category	categories	111	["active", "edit", "delete"]	[
//   {
//     "Header": "شناسه",
//     "Accessor": "id",
//     "Type": "number",
//     "Options": ["Active", "Edit", "Delete"]
//   },
//   {
//     "Header": "نام دسته‌بندی",
//     "Accessor": "name",
//     "Type": "text",
//     "Options": ["Active", "Edit", "Delete"]
//   },
//   {
//     "Header": "دسته والد",
//     "Accessor": "parentCategoryId",
//     "Type": "number",
//     "Options": ["Active", "Edit", "Delete"]
//   },
//   {
//     "Header": "تاریخ ایجاد",
//     "Accessor": "createdAt",
//     "Type": "date",
//     "Options": []
//   }
// ]
// 	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//   {
//     "Name": "name",
//     "Caption": "نام دسته‌بندی",
//     "Type": "text",
//     "PlaceHolder": "مثلاً: تلویزیون",
//     "Help": "نام دسته را وارد کنید",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "نام دسته‌بندی الزامی است" },
//       { "Rule": "minLength", "Condition": "2", "Message": "حداقل دو کاراکتر وارد کنید" }
//     ]
//   },
//   {
//     "Name": "parentCategoryId",
//     "Caption": "دسته والد",
//     "Type": "select",
//     "PlaceHolder": "در صورت وجود، دسته والد را انتخاب کنید",
//     "Help": "می‌توانید این دسته را به عنوان زیرمجموعه یک دسته دیگر تعیین کنید",
//     "Rules": [],
//     "OptionsSource": "categories" 
//   },
//   {
//     "Name": "isActive",
//     "Caption": "وضعیت",
//     "Type": "checkbox",
//     "PlaceHolder": "",
//     "Help": "در صورت غیرفعال بودن، دسته‌بندی در لیست نمایش داده نمی‌شود",
//     "Rules": []
//   }
// ]
// 11	discounts	تخفیف‌ها	Discount	discounts	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" className="stroke-primary">
// <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h.008v.008H7.5V7.5Zm9 9h.008v.008H16.5V16.5ZM3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0Zm4.5-4.5 9 9" />
// </svg>	["active","edit","delete"]	[
//   { "Header":"شناسه","Accessor":"id","Type":"number","Options":["Active","Edit","Delete"] },
//   { "Header":"عنوان تخفیف","Accessor":"title","Type":"text","Options":["Active","Edit","Delete"] },
//   { "Header":"مقدار تخفیف","Accessor":"amount","Type":"number","Options":["Active","Edit","Delete"] },
//   { "Header":"درصدی؟","Accessor":"isPercent","Type":"checkbox","Options":["Active","Edit","Delete"] },
//   { "Header":"تاریخ شروع","Accessor":"startDate","Type":"date","Options":["Active","Edit","Delete"] },
//   { "Header":"تاریخ پایان","Accessor":"endDate","Type":"date","Options":["Active","Edit","Delete"] },
//   { "Header":"وضعیت فعال","Accessor":"isActive","Type":"badge","Options":["Active","Edit","Delete"] }
// ]	2025-10-13 14:32:00.0000000	2025-10-13 14:32:00.0000000	NULL	0	1	1	NULL	1	[
//   {
//     "Name": "title",
//     "Caption": "عنوان تخفیف",
//     "Type": "text",
//     "PlaceHolder": "مثلاً: تخفیف تابستانی",
//     "Help": "نام نمایشی برای تخفیف",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "عنوان تخفیف الزامی است" }
//     ]
//   },
//   {
//     "Name": "amount",
//     "Caption": "مقدار تخفیف",
//     "Type": "number",
//     "PlaceHolder": "مثلاً: 15",
//     "Help": "عدد تخفیف به تومان یا درصد",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "مقدار تخفیف الزامی است" },
//       { "Rule": "min", "Condition": "1", "Message": "مقدار باید بزرگ‌تر از صفر باشد" }
//     ]
//   },
//   {
//     "Name": "isPercent",
//     "Caption": "آیا تخفیف درصدی است؟",
//     "Type": "checkbox",
//     "PlaceHolder": "",
//     "Help": "در صورت فعال بودن، مقدار تخفیف برحسب درصد است",
//     "Rules": []
//   },
//   {
//     "Name": "startDate",
//     "Caption": "تاریخ شروع تخفیف",
//     "Type": "date",
//     "PlaceHolder": "",
//     "Help": "تاریخی که تخفیف از آن فعال می‌شود",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "تاریخ شروع الزامی است" }
//     ]
//   },
//   {
//     "Name": "endDate",
//     "Caption": "تاریخ پایان تخفیف",
//     "Type": "date",
//     "PlaceHolder": "",
//     "Help": "تاریخی که تخفیف تا آن معتبر است",
//     "Rules": [
//       { "Rule": "required", "Condition": "true", "Message": "تاریخ پایان الزامی است" }
//     ]
//   },
//   {
//     "Name": "isActive",
//     "Caption": "فعال باشد؟",
//     "Type": "checkbox",
//     "PlaceHolder": "",
//     "Help": "برای فعال/غیرفعال کردن وضعیت تخفیف",
//     "Rules": []
//   }
// ]
// 12	entityConfigs	پیکربندی موجودیت‌ها	Entity Configs	entityConfigs	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 6v12m6-6H6\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام موجودیت\",\"Accessor\":\"entityName\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام فارسی\",\"Accessor\":\"persianDisplayName\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام انگلیسی\",\"Accessor\":\"englishDisplayName\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"آدرس API\",\"Accessor\":\"endPoint\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"آیکون\",\"Accessor\":\"entityIconBase64\",\"Type\":\"image\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تاریخ ایجاد\",\"Accessor\":\"createdDate\",\"Type\":\"date\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"entityName\",
//       \"Caption\": \"نام موجودیت\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"مثلاً: products\",
//       \"Help\": \"شناسه داخلی موجودیت (به انگلیسی کوچک)\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام موجودیت الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"persianDisplayName\",
//       \"Caption\": \"نام فارسی\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"مثلاً: محصولات\",
//       \"Help\": \"نام نمایشی در منوها و فرم‌ها\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام فارسی الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"englishDisplayName\",
//       \"Caption\": \"نام انگلیسی\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"مثلاً: Products\",
//       \"Help\": \"نام انگلیسی برای استفاده در frontend یا api\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام انگلیسی الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"endPoint\",
//       \"Caption\": \"آدرس API\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"مثلاً: products\",
//       \"Help\": \"قسمت انتهایی endpoint برای دریافت داده‌ها\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"آدرس endpoint الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"entityIconBase64\",
//       \"Caption\": \"آیکون موجودیت (SVG)\",
//       \"Type\": \"textarea\",
//       \"PlaceHolder\": \"کد SVG آیکون را وارد کنید\",
//       \"Help\": \"برای نمایش در منوی سمت راست\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"actionsJson\",
//       \"Caption\": \"عملیات‌ها\",
//       \"Type\": \"textarea\",
//       \"PlaceHolder\": \"مثلاً: [\\\"active\\\",\\\"edit\\\",\\\"delete\\\"]\",
//       \"Help\": \"لیست عملیات مجاز برای موجودیت\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"columnsJson\",
//       \"Caption\": \"ستون‌های جدول\",
//       \"Type\": \"textarea\",
//       \"PlaceHolder\": \"JSON مربوط به ستون‌ها را وارد کنید\",
//       \"Help\": \"برای ساخت جدول در UI\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"formFieldsJson\",
//       \"Caption\": \"فیلدهای فرم\",
//       \"Type\": \"textarea\",
//       \"PlaceHolder\": \"JSON مربوط به فیلدهای فرم را وارد کنید\",
//       \"Help\": \"برای ساخت فرم ویرایش/افزودن\",
//       \"Rules\": []
//     }
//   ]
// 13	products	محصولات	Products	products	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3z\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام محصول\",\"Accessor\":\"name\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت\",\"Accessor\":\"price\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"موجودی\",\"Accessor\":\"inventory\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"دسته‌بندی\",\"Accessor\":\"categoryId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"برند\",\"Accessor\":\"brandId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"توضیحات\",\"Accessor\":\"description\",\"Type\":\"textarea\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"name\",
//       \"Caption\": \"نام محصول\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"نام محصول را وارد کنید\",
//       \"Help\": \"مثلاً: تلویزیون سامسونگ 55 اینچ\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام محصول الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"description\",
//       \"Caption\": \"توضیحات\",
//       \"Type\": \"textarea\",
//       \"PlaceHolder\": \"توضیحات محصول را وارد کنید\",
//       \"Help\": \"می‌توانید ویژگی‌ها و مشخصات محصول را بنویسید\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"price\",
//       \"Caption\": \"قیمت\",
//       \"Type\": \"number\",
//       \"PlaceHolder\": \"قیمت محصول را وارد کنید\",
//       \"Help\": \"به تومان\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"قیمت محصول الزامی است\" },
//         { \"Rule\": \"min\", \"Condition\": \"0\", \"Message\": \"قیمت نمی‌تواند منفی باشد\" }
//       ]
//     },
//     {
//       \"Name\": \"inventory\",
//       \"Caption\": \"موجودی\",
//       \"Type\": \"number\",
//       \"PlaceHolder\": \"تعداد موجودی را وارد کنید\",
//       \"Help\": \"تعداد محصول در انبار\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"موجودی الزامی است\" },
//         { \"Rule\": \"min\", \"Condition\": \"0\", \"Message\": \"موجودی نمی‌تواند منفی باشد\" }
//       ]
//     },
//     {
//       \"Name\": \"categoryId\",
//       \"Caption\": \"دسته‌بندی\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"دسته‌بندی محصول را انتخاب کنید\",
//       \"Help\": \"محصول به کدام دسته تعلق دارد\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"دسته‌بندی الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"brandId\",
//       \"Caption\": \"برند\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"برند محصول را انتخاب کنید\",
//       \"Help\": \"می‌تواند خالی باشد\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"images\",
//       \"Caption\": \"تصاویر محصول\",
//       \"Type\": \"fileMultiple\",
//       \"PlaceHolder\": \"تصاویر محصول را آپلود کنید\",
//       \"Help\": \"می‌توانید چند تصویر اضافه کنید\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"productTags\",
//       \"Caption\": \"تگ‌ها\",
//       \"Type\": \"tags\",
//       \"PlaceHolder\": \"تگ‌های محصول را انتخاب کنید\",
//       \"Help\": \"برای جستجو و فیلتر بهتر\",
//       \"Rules\": []
//     }
//   ]
// 14	tags	تگ‌ها	Tags	tags	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M7 7h10v10H7V7z\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام تگ\",\"Accessor\":\"name\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"name\",
//       \"Caption\": \"نام تگ\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"نام تگ را وارد کنید\",
//       \"Help\": \"مثلاً: تلویزیون، گوشی، لپ‌تاپ\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام تگ الزامی است\" }
//       ]
//     }
//   ]
// 15	users	کاربران	Users	users	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام کامل\",\"Accessor\":\"fullName\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"ایمیل\",\"Accessor\":\"email\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شماره تماس\",\"Accessor\":\"phoneNumber\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نقش\",\"Accessor\":\"roleId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"fullName\",
//       \"Caption\": \"نام کامل\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"نام و نام خانوادگی را وارد کنید\",
//       \"Help\": \"مثلاً: محمد رضایی\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام کامل الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"email\",
//       \"Caption\": \"ایمیل\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"example@gmail.com\",
//       \"Help\": \"آدرس ایمیل معتبر وارد کنید\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"ایمیل الزامی است\" },
//         { \"Rule\": \"email\", \"Condition\": \"true\", \"Message\": \"ایمیل نامعتبر است\" }
//       ]
//     },
//     {
//       \"Name\": \"phoneNumber\",
//       \"Caption\": \"شماره تماس\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"09123456789\",
//       \"Help\": \"شماره موبایل را بدون فاصله وارد کنید\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شماره تماس الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"password\",
//       \"Caption\": \"رمز عبور\",
//       \"Type\": \"password\",
//       \"PlaceHolder\": \"رمز عبور را وارد کنید\",
//       \"Help\": \"حداقل ۸ کاراکتر\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"رمز عبور الزامی است\" },
//         { \"Rule\": \"minLength\", \"Condition\": \"8\", \"Message\": \"رمز عبور باید حداقل ۸ کاراکتر باشد\" }
//       ]
//     },
//     {
//       \"Name\": \"roleId\",
//       \"Caption\": \"نقش\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"نقش کاربر را انتخاب کنید\",
//       \"Help\": \"مثلاً: Admin, Customer\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نقش الزامی است\" }
//       ]
//     }
//   ]
// 16	userAddresses	آدرس کاربران	User Addresses	userAddresses	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه کاربر\",\"Accessor\":\"userId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شهر\",\"Accessor\":\"city\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"استان\",\"Accessor\":\"state\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"کد پستی\",\"Accessor\":\"postalCode\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"آدرس کامل\",\"Accessor\":\"fullAddress\",\"Type\":\"textarea\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"پیش‌فرض\",\"Accessor\":\"isDefault\",\"Type\":\"checkbox\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"userId\",
//       \"Caption\": \"شناسه کاربر\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه کاربر را وارد کنید\",
//       \"Help\": \"شناسه کاربری که این آدرس به آن تعلق دارد\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه کاربر الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"city\",
//       \"Caption\": \"شهر\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"نام شهر\",
//       \"Help\": \"مثلاً: تهران\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام شهر الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"state\",
//       \"Caption\": \"استان\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"نام استان\",
//       \"Help\": \"مثلاً: تهران\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام استان الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"postalCode\",
//       \"Caption\": \"کد پستی\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"کد پستی را وارد کنید\",
//       \"Help\": \"مثلاً: 1234567890\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"کد پستی الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"fullAddress\",
//       \"Caption\": \"آدرس کامل\",
//       \"Type\": \"textarea\",
//       \"PlaceHolder\": \"آدرس کامل را وارد کنید\",
//       \"Help\": \"مثلاً: خیابان آزادی، پلاک 12\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"آدرس کامل الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"isDefault\",
//       \"Caption\": \"پیش‌فرض\",
//       \"Type\": \"checkbox\",
//       \"PlaceHolder\": \"\",
//       \"Help\": \"این آدرس به عنوان آدرس پیش‌فرض انتخاب شود\",
//       \"Rules\": []
//     }
//   ]
// 17	carts	سبد خرید	Cart	carts	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7H19M7 13l-1.5 7M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه کاربر\",\"Accessor\":\"userId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"وضعیت\",\"Accessor\":\"status\",\"Type\":\"select\",\"Options\":[\"Active\",\"Checkout\",\"Paid\",\"Cancelled\"]},{\"Header\":\"تعداد آیتم‌ها\",\"Accessor\":\"itemsCount\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت کل\",\"Accessor\":\"totalPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"userId\",
//       \"Caption\": \"شناسه کاربر\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه کاربر را وارد کنید\",
//       \"Help\": \"سبد خرید متعلق به این کاربر است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه کاربر الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"status\",
//       \"Caption\": \"وضعیت سبد\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"انتخاب وضعیت\",
//       \"Help\": \"وضعیت فعلی سبد خرید\",
//       \"Options\": [\"Active\", \"Checkout\", \"Paid\", \"Cancelled\"],
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"وضعیت سبد الزامی است\" }
//       ]
//     }
//   ]
// 18	orders	سفارش‌ها	Order	orders	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3zM3 7h18M7 3v18\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه کاربر\",\"Accessor\":\"userId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"وضعیت\",\"Accessor\":\"status\",\"Type\":\"select\",\"Options\":[\"Pending\",\"Confirmed\",\"Paid\",\"Shipped\",\"Delivered\",\"Cancelled\"]},{\"Header\":\"تاریخ سفارش\",\"Accessor\":\"orderDate\",\"Type\":\"date\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت کل\",\"Accessor\":\"totalPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت نهایی\",\"Accessor\":\"finalPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"userId\",
//       \"Caption\": \"شناسه کاربر\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه کاربر را وارد کنید\",
//       \"Help\": \"سفارش متعلق به این کاربر است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه کاربر الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"status\",
//       \"Caption\": \"وضعیت سفارش\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"انتخاب وضعیت\",
//       \"Help\": \"وضعیت فعلی سفارش\",
//       \"Options\": [\"Pending\",\"Confirmed\",\"Paid\",\"Shipped\",\"Delivered\",\"Cancelled\"],
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"وضعیت سفارش الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"shippingAddressId\",
//       \"Caption\": \"آدرس ارسال\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه آدرس را وارد کنید\",
//       \"Help\": \"آدرس ارسال سفارش\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"آدرس ارسال الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"shippingMethod\",
//       \"Caption\": \"روش ارسال\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"انتخاب روش ارسال\",
//       \"Help\": \"روش ارسال سفارش\",
//       \"Options\": [\"Post\",\"Courier\",\"InPlace\"]
//     },
//     {
//       \"Name\": \"paymentMethod\",
//       \"Caption\": \"روش پرداخت\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"انتخاب روش پرداخت\",
//       \"Help\": \"روش پرداخت سفارش\",
//       \"Options\": [\"Online\",\"Cash\",\"CardOnDelivery\"]
//     },
//     {
//       \"Name\": \"shippingCost\",
//       \"Caption\": \"هزینه ارسال\",
//       \"Type\": \"decimal\",
//       \"PlaceHolder\": \"مقدار هزینه ارسال\",
//       \"Help\": \"هزینه ارسال سفارش\"
//     },
//     {
//       \"Name\": \"discountAmount\",
//       \"Caption\": \"مقدار تخفیف\",
//       \"Type\": \"decimal\",
//       \"PlaceHolder\": \"مقدار تخفیف را وارد کنید\",
//       \"Help\": \"تخفیف کل سفارش\"
//     },
//     {
//       \"Name\": \"trackingCode\",
//       \"Caption\": \"کد رهگیری\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"کد رهگیری را وارد کنید\",
//       \"Help\": \"کد رهگیری پستی یا باربری\"
//     }
//   ]
// 19	cartItems	آیتم‌های سبد خرید	CartItem	cart-items	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3zM7 3v18\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه سبد خرید\",\"Accessor\":\"cartId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تعداد\",\"Accessor\":\"quantity\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"cartId\",
//       \"Caption\": \"شناسه سبد خرید\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه سبد خرید را وارد کنید\",
//       \"Help\": \"این آیتم متعلق به این سبد خرید است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه سبد خرید الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"productId\",
//       \"Caption\": \"محصول\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه محصول را وارد کنید\",
//       \"Help\": \"محصولی که به سبد اضافه شده است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه محصول الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"quantity\",
//       \"Caption\": \"تعداد\",
//       \"Type\": \"number\",
//       \"PlaceHolder\": \"تعداد محصول را وارد کنید\",
//       \"Help\": \"تعداد واحدهای این محصول در سبد\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"تعداد الزامی است\" },
//         { \"Rule\": \"min\", \"Condition\": \"1\", \"Message\": \"تعداد باید حداقل 1 باشد\" }
//       ]
//     }
//   ]
// 20	orderItems	آیتم‌های سفارش	OrderItem	order-items	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M3 3h18v18H3V3zM7 3v18\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه سفارش\",\"Accessor\":\"orderId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تعداد\",\"Accessor\":\"quantity\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت واحد\",\"Accessor\":\"unitPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تخفیف\",\"Accessor\":\"discountAmount\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت نهایی واحد\",\"Accessor\":\"finalUnitPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"قیمت کل\",\"Accessor\":\"totalPrice\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"orderId\",
//       \"Caption\": \"شناسه سفارش\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه سفارش را وارد کنید\",
//       \"Help\": \"این آیتم متعلق به کدام سفارش است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه سفارش الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"productId\",
//       \"Caption\": \"محصول\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه محصول را وارد کنید\",
//       \"Help\": \"محصولی که به سفارش اضافه شده است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه محصول الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"quantity\",
//       \"Caption\": \"تعداد\",
//       \"Type\": \"number\",
//       \"PlaceHolder\": \"تعداد محصول را وارد کنید\",
//       \"Help\": \"تعداد واحدهای محصول در این سفارش\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"تعداد الزامی است\" },
//         { \"Rule\": \"min\", \"Condition\": \"1\", \"Message\": \"تعداد باید حداقل 1 باشد\" }
//       ]
//     },
//     {
//       \"Name\": \"unitPrice\",
//       \"Caption\": \"قیمت واحد\",
//       \"Type\": \"decimal\",
//       \"PlaceHolder\": \"قیمت واحد محصول\",
//       \"Help\": \"قیمت محصول قبل از تخفیف\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"discountAmount\",
//       \"Caption\": \"تخفیف\",
//       \"Type\": \"decimal\",
//       \"PlaceHolder\": \"میزان تخفیف\",
//       \"Help\": \"مقدار تخفیف اعمال شده روی این محصول\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"finalUnitPrice\",
//       \"Caption\": \"قیمت نهایی واحد\",
//       \"Type\": \"decimal\",
//       \"PlaceHolder\": \"قیمت نهایی واحد\",
//       \"Help\": \"قیمت واحد بعد از اعمال تخفیف\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"totalPrice\",
//       \"Caption\": \"قیمت کل\",
//       \"Type\": \"decimal\",
//       \"PlaceHolder\": \"قیمت کل آیتم\",
//       \"Help\": \"قیمت کل این آیتم = قیمت نهایی واحد × تعداد\",
//       \"Rules\": []
//     }
//   ]
// 21	payments	پرداخت‌ها	Payment	payments	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 1v22M1 12h22\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"سفارش\",\"Accessor\":\"orderId\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تاریخ پرداخت\",\"Accessor\":\"paymentDate\",\"Type\":\"datetime\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"مبلغ\",\"Accessor\":\"amount\",\"Type\":\"decimal\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"روش پرداخت\",\"Accessor\":\"paymentMethod\",\"Type\":\"enum\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"وضعیت\",\"Accessor\":\"status\",\"Type\":\"enum\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"شناسه تراکنش\",\"Accessor\":\"transactionId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"orderId\",
//       \"Caption\": \"شناسه سفارش\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه سفارش را وارد کنید\",
//       \"Help\": \"این پرداخت مربوط به کدام سفارش است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"شناسه سفارش الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"amount\",
//       \"Caption\": \"مبلغ\",
//       \"Type\": \"decimal\",
//       \"PlaceHolder\": \"مبلغ پرداخت را وارد کنید\",
//       \"Help\": \"مبلغ پرداخت شده توسط مشتری\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"مبلغ الزامی است\" },
//         { \"Rule\": \"min\", \"Condition\": \"0.01\", \"Message\": \"مبلغ باید بزرگتر از صفر باشد\" }
//       ]
//     },
//     {
//       \"Name\": \"paymentMethod\",
//       \"Caption\": \"روش پرداخت\",
//       \"Type\": \"enum\",
//       \"PlaceHolder\": \"روش پرداخت را انتخاب کنید\",
//       \"Help\": \"روش پرداخت: آنلاین یا نقدی\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"روش پرداخت الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"status\",
//       \"Caption\": \"وضعیت\",
//       \"Type\": \"enum\",
//       \"PlaceHolder\": \"وضعیت پرداخت\",
//       \"Help\": \"وضعیت پرداخت: Pending, Success, Failed, Cancelled\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"transactionId\",
//       \"Caption\": \"شناسه تراکنش\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"شناسه تراکنش را وارد کنید\",
//       \"Help\": \"شناسه تراکنش پرداخت آنلاین\",
//       \"Rules\": []
//     },
//     {
//       \"Name\": \"paymentDate\",
//       \"Caption\": \"تاریخ پرداخت\",
//       \"Type\": \"datetime\",
//       \"PlaceHolder\": \"تاریخ و زمان پرداخت\",
//       \"Help\": \"تاریخ انجام پرداخت\",
//       \"Rules\": []
//     }
//   ]
// 22	roles	نقش‌ها	Role	roles	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4 2\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"نام نقش\",\"Accessor\":\"roleName\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"roleName\",
//       \"Caption\": \"نام نقش\",
//       \"Type\": \"text\",
//       \"PlaceHolder\": \"نام نقش را وارد کنید\",
//       \"Help\": \"مثلاً: مدیر، مشتری، فروشنده\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"نام نقش الزامی است\" },
//         { \"Rule\": \"minLength\", \"Condition\": \"2\", \"Message\": \"نام نقش باید حداقل ۲ کاراکتر باشد\" }
//       ]
//     }
//   ]
// 23	productDiscounts	تخفیف محصولات	ProductDiscount	productDiscounts	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M12 2l3 7H9l3-7zM12 22a10 10 0 100-20 10 10 0 000 20z\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تخفیف\",\"Accessor\":\"discountId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"productId\",
//       \"Caption\": \"محصول\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"محصول را انتخاب کنید\",
//       \"Help\": \"انتخاب محصول برای تخفیف\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"انتخاب محصول الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"discountId\",
//       \"Caption\": \"تخفیف\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"تخفیف را انتخاب کنید\",
//       \"Help\": \"انتخاب تخفیف برای محصول\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"انتخاب تخفیف الزامی است\" }
//       ]
//     }
//   ]
// 24	productImages	تصاویر محصول	ProductImage	productImages	<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#fff\" className=\"stroke-primary\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" d=\"M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM3 9l4 4 3-3 5 5 4-4\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"text\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تصویر\",\"Accessor\":\"imageUrl\",\"Type\":\"image\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"اصلی\",\"Accessor\":\"isMain\",\"Type\":\"checkbox\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"productId\",
//       \"Caption\": \"محصول\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"محصول را انتخاب کنید\",
//       \"Help\": \"تصویر برای کدام محصول است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"انتخاب محصول الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"imageUrl\",
//       \"Caption\": \"آدرس تصویر\",
//       \"Type\": \"file\",
//       \"PlaceHolder\": \"آدرس تصویر را وارد کنید\",
//       \"Help\": \"تصویر محصول را آپلود کنید\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"وارد کردن تصویر الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"isMain\",
//       \"Caption\": \"تصویر اصلی\",
//       \"Type\": \"checkbox\",
//       \"PlaceHolder\": \"\",
//       \"Help\": \"آیا این تصویر اصلی محصول است؟\",
//       \"Rules\": []
//     }
//   ]
// 25	productTags	تگ‌های محصول	ProductTag	productTags	<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" class=\"w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 7h10M7 12h10M7 17h10\"/></svg>	[\"active\",\"edit\",\"delete\"]	[{\"Header\":\"شناسه\",\"Accessor\":\"id\",\"Type\":\"number\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"محصول\",\"Accessor\":\"productId\",\"Type\":\"select\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]},{\"Header\":\"تگ\",\"Accessor\":\"tagId\",\"Type\":\"select\",\"Options\":[\"Active\",\"Edit\",\"Delete\"]}]	2025-10-13 00:00:00.0000000	2025-10-13 00:00:00.0000000	NULL	0	1	1	NULL	1	[
//     {
//       \"Name\": \"productId\",
//       \"Caption\": \"محصول\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"محصول را انتخاب کنید\",
//       \"Help\": \"تگ مربوط به کدام محصول است\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"انتخاب محصول الزامی است\" }
//       ]
//     },
//     {
//       \"Name\": \"tagId\",
//       \"Caption\": \"تگ\",
//       \"Type\": \"select\",
//       \"PlaceHolder\": \"تگ را انتخاب کنید\",
//       \"Help\": \"کدام تگ را به محصول اضافه می‌کنید\",
//       \"Rules\": [
//         { \"Rule\": \"required\", \"Condition\": \"true\", \"Message\": \"انتخاب تگ الزامی است\" }
//       ]
//     }
//   ]