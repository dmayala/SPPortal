using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace SPPortal.Models
{
    /// <summary>
    /// Request entity
    /// </summary>
    public class Request
    {
        public long id { get; set; }
        public string ta1 { get; set; }
        public string ta2 { get; set; }
        public string ta3 { get; set; }
        public string ta4 { get; set; }

        public string tr1 { get; set; }
        public string tr2 { get; set; }
        public string tr3 { get; set; }
        public string tr4 { get; set; }

        [ForeignKey("Project")]
        public long ProjectID { get; set; }
        public virtual Project Project { get; set; }
    }
}