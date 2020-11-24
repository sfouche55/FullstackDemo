using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Contact
    {
        public long Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public string PhoneNumber { get; set; }
    }
}
