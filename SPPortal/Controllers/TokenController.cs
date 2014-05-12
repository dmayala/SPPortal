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
            string allText = "{'loggedIn': false}";

            if (User.Identity.IsAuthenticated) {
                allText = "{'role': false, 'loggedIn': true, 'userName': '" + User.Identity.Name + "'}";
                try
                {
                    if (User.IsInRole("Admin"))
                    {
                        allText = "{'role': true, 'loggedIn': true, 'userName': '" + User.Identity.Name + "'}";
                    }
                } catch (Exception ex) {

                }
            }

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return jsonObject;
        }
    }
}
