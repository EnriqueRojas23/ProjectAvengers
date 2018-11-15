using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CargaClic.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Mantenimiento");

            migrationBuilder.EnsureSchema(
                name: "Seguridad");

            migrationBuilder.CreateTable(
                name: "Tablas",
                schema: "Mantenimiento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    NombreTabla = table.Column<string>(maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tablas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Paginas",
                schema: "Seguridad",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Codigo = table.Column<string>(maxLength: 5, nullable: false),
                    CodigoPadre = table.Column<string>(maxLength: 5, nullable: true),
                    Descripcion = table.Column<string>(maxLength: 50, nullable: false),
                    Link = table.Column<string>(maxLength: 50, nullable: true),
                    Nivel = table.Column<int>(nullable: false),
                    Orden = table.Column<int>(nullable: false),
                    Icono = table.Column<string>(maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paginas", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                schema: "Seguridad",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Descripcion = table.Column<string>(maxLength: 50, nullable: false),
                    Alias = table.Column<string>(maxLength: 10, nullable: false),
                    Activo = table.Column<bool>(nullable: false),
                    Publico = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Estados",
                schema: "Mantenimiento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    NombreEstado = table.Column<string>(maxLength: 15, nullable: false),
                    Descripcion = table.Column<string>(maxLength: 50, nullable: true),
                    TablaId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estados", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Estados_Tablas_TablaId",
                        column: x => x.TablaId,
                        principalSchema: "Mantenimiento",
                        principalTable: "Tablas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RolesPaginas",
                schema: "Seguridad",
                columns: table => new
                {
                    IdRol = table.Column<int>(nullable: false),
                    IdPagina = table.Column<int>(nullable: false),
                    permisos = table.Column<string>(maxLength: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolesPaginas", x => new { x.IdRol, x.IdPagina });
                    table.ForeignKey(
                        name: "FK_RolesPaginas_Paginas_IdPagina",
                        column: x => x.IdPagina,
                        principalSchema: "Seguridad",
                        principalTable: "Paginas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolesPaginas_Roles_IdRol",
                        column: x => x.IdRol,
                        principalSchema: "Seguridad",
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "Seguridad",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(maxLength: 15, nullable: false),
                    NombreCompleto = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: false),
                    EnLinea = table.Column<bool>(nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime", nullable: false),
                    LastActive = table.Column<DateTime>(type: "datetime", nullable: false),
                    PasswordHash = table.Column<byte[]>(nullable: false),
                    PasswordSalt = table.Column<byte[]>(nullable: false),
                    EstadoId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Estados_EstadoId",
                        column: x => x.EstadoId,
                        principalSchema: "Mantenimiento",
                        principalTable: "Estados",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Estados_TablaId",
                schema: "Mantenimiento",
                table: "Estados",
                column: "TablaId");

            migrationBuilder.CreateIndex(
                name: "IX_RolesPaginas_IdPagina",
                schema: "Seguridad",
                table: "RolesPaginas",
                column: "IdPagina");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EstadoId",
                schema: "Seguridad",
                table: "Users",
                column: "EstadoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RolesPaginas",
                schema: "Seguridad");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "Seguridad");

            migrationBuilder.DropTable(
                name: "Paginas",
                schema: "Seguridad");

            migrationBuilder.DropTable(
                name: "Roles",
                schema: "Seguridad");

            migrationBuilder.DropTable(
                name: "Estados",
                schema: "Mantenimiento");

            migrationBuilder.DropTable(
                name: "Tablas",
                schema: "Mantenimiento");
        }
    }
}
