using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Matenimiento
{
    public class ChoferForRegisterDto
    {
        public int Id {get;set;}
        [Required]
        [MaxLength(20)]
        [MinLength(4)]
        public string Placa { get; set; }
        public int? TipoId { get; set; }
        
        public int? MarcaId { get; set; }
        public int? ModeloId { get; set; }
        public int? AnioId { get; set; }
        public int? ColorId { get; set; }
        public int? CombustibleId { get; set; }
        public string Regmtc { get; set; }
        public string Confveh { get; set; }
        [Required]
        public decimal? CargaUtil { get; set; }
        [Required]
        public decimal? PesoBruto { get; set; }
        public string SerieMotor { get; set; }
        public string Kilometraje { get; set; }
    }
}