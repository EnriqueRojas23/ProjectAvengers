using System;
using System.ComponentModel.DataAnnotations;

namespace CargaClic.API.Dtos.Recepcion
{
    public class LocationsForAssignmentDto
    {
        public Guid OrdenReciboId {get;set;}
        public int UbicacionId {get;set;}
    }
}