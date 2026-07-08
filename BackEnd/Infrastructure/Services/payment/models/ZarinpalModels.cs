using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services.payment.models
{

        public class ZarinpalRequestResponse
        {
            public ZarinpalRequestData? data { get; set; }
            public List<ZarinpalError>? errors { get; set; }
        }

        public class ZarinpalRequestData
        {
            public string authority { get; set; } = default!;
            public int code { get; set; }
            public string message { get; set; } = default!;
        }

        public class ZarinpalError
        {
            public int code { get; set; }
            public string message { get; set; } = default!;
        }
    public class ZarinpalVerifyResponse
    {
        public ZarinpalVerifyData? data { get; set; }
        public List<ZarinpalError>? errors { get; set; }
    }

    public class ZarinpalVerifyData
    {
        public int code { get; set; }
        public string message { get; set; } = default!;
        public long ref_id { get; set; }
    }


}
