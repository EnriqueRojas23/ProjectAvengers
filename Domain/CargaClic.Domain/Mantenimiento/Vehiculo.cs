using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
   public class Vehiculo : Entity
  {
        public int Id { get; set; }
        public string Placa { get; set; }
        public int? TipoId { get; set; }
        public int? MarcaId { get; set; }
        public int? ModeloId { get; set; }
        public int? AnioId { get; set; }
        public int? ColorId { get; set; }
        public int? CombustibleId { get; set; }
        public string Regmtc { get; set; }
        public string Confveh { get; set; }
        public decimal? CargaUtil { get; set; }
        public decimal? PesoBruto { get; set; }
        public string SerieMotor { get; set; }
        public string Kilometraje { get; set; }

    }
}