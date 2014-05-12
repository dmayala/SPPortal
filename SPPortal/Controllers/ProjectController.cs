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
    public class ProjectController : ApiController
    {
        private SPContext db = new SPContext();

        // GET api/Project
        public IEnumerable<Project> GetProjects()
        {
            return db.Projects.AsEnumerable();
        }

        // GET api/Project/5
        public IEnumerable<Project> GetMyProjects(Boolean user)
        {
            IEnumerable<Project> projects = db.Projects.Where(p => p.UserProfile.UserName == User.Identity.Name).AsEnumerable();
            if (projects == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return projects;
        }

        // GET api/Project/5
        public Project GetProject(long id)
        {
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return project;
        }

        //Get Showcase or Non-Showcase Projects
        public IEnumerable<Project> GetShowcaseProjects(Boolean showcase)
        {
            return db.Projects.Where(p => p.featured == showcase).AsEnumerable();
        }

        public IEnumerable<Project> GetCompletedProjects(Boolean completed)
        {
            return db.Projects.Where(p => p.status == "completed").AsEnumerable();
        }

        [Authorize(Roles = "Admin")]
        public IEnumerable<Project> GetPendingProjects(Boolean pending)
        {
            return db.Projects.Where(p => p.status == "pending").AsEnumerable();
        }

        [Authorize(Roles = "Admin")]
        public IEnumerable<Project> GetApprovedProjects(Boolean approved)
        {
            return db.Projects.Where(p => p.status == "approved").AsEnumerable();
        }

        //Search Projects
        // GET api/Project?q=parameter
        public IEnumerable<Project> GetProjects(string q)
        {
            if (String.IsNullOrEmpty(q))
            {
                return GetCompletedProjects(true);
            }

            IEnumerable<Project> projects = db.Projects.Where(p => p.name.Contains(q) && p.status.Equals("completed")).AsEnumerable();
            if (projects == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return projects;
        }

        // PUT api/Project/5
        public HttpResponseMessage PutProject(long id, Project project)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != project.id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(project).State = EntityState.Modified;

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

        // POST api/Project
        public HttpResponseMessage PostProject(Project project)
        {
            if (ModelState.IsValid)
            {

                UserProfile user = db.UserProfiles.FirstOrDefault(u => u.UserName == User.Identity.Name);
                project.UserId = user.UserId;

                db.Projects.Add(project);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, project);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = project.id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/Project/5
        public HttpResponseMessage DeleteProject(long id)
        {
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Projects.Remove(project);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, project);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}