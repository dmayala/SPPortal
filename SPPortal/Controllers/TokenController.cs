using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SPPortal.Controllers
{
    public class TokenController : ApiController
    {
        // GET api/Token
        public object Get()
        {
            // Work in Progress
            //string allText = "{'loggedIn': false}";
            //object jsonObject = JsonConvert.DeserializeObject(allText);
            //return jsonObject;
            string allText = "{'loggedIn': false}";

            if (User.Identity.IsAuthenticated) {
                allText = "{'loggedIn': true}";
            }

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return jsonObject;
        }
    }
}
