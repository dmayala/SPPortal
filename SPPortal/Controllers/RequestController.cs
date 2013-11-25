using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using SPPortal.Models;

namespace SPPortal.Controllers
{
    public class RequestController : ApiController
    {
        private SPContext db = new SPContext();

        // GET api/Request
        public IEnumerable<Request> GetRequests()
        {
            return db.Requests.AsEnumerable();
        }

        // GET api/Request/5
        public Request GetRequest(long id)
        {
            Request request = db.Requests.Find(id);
            if (request == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return request;
        }

        // PUT api/Request/5
        public HttpResponseMessage PutRequest(long id, Request request)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != request.id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(request).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/Request
        public HttpResponseMessage PostRequest(Request request)
        {
            //using (UsersContext db2 = new UsersContext())
            //{
            //    UserProfile user = db2.UserProfiles.FirstOrDefault(u => u.UserName.ToLower() == User.Identity.Name);
            //    Project project = db.Projects.LastOrDefault(p => p.UserId == user.UserId);
            //    request.ProjectId = project.UserId;
            //}

            UserProfile user = db.UserProfiles.FirstOrDefault(u => u.UserName.ToLower() == User.Identity.Name);
            Project project = db.Projects.OrderByDescending(p => p.id).FirstOrDefault(p => p.UserId == user.UserId); 
            request.ProjectId = project.id;

            if (ModelState.IsValid)
            {
                db.Requests.Add(request);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, request);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = request.id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Request/5
        public HttpResponseMessage DeleteRequest(long id)
        {
            Request request = db.Requests.Find(id);
            if (request == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Requests.Remove(request);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, request);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}