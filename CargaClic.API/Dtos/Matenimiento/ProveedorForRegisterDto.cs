using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Matenimiento
{
    public class  ProveedorForRegisterDto
    {
        public int Id {get;set;}
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string RazonSocial { get; set; }
        [Required]
        [MinLength(8)]
        [MaxLength(11)]
        public string Ruc { get; set; }
    }
}