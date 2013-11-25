using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace SPPortal.Models
{
    /// <summary>
    /// Project entity
    /// </summary>
    public class Project
    {
        public long id { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public string description { get; set; }
        public string img { get; set; }
        public Boolean featured { get; set; }

        [ForeignKey("UserProfile")]
        public int UserId { get; set; }
        public virtual UserProfile UserProfile { get; set; }
    }
}