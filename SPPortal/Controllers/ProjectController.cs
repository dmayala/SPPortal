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

        //Search Projects
        // GET api/Project?q=parameter
        public IEnumerable<Project> GetProjects(string q)
        {
            if (String.IsNullOrEmpty(q))
            {
                return GetProjects();
            }

            IEnumerable<Project> projects = db.Projects.Where(p => p.name.Contains(q)).AsEnumerable();
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