﻿// <auto-generated />
using System;
using DAL.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DAL.Migrations
{
    [DbContext(typeof(YomContext))]
    [Migration("20230920090555_CategoryPhoto")]
    partial class CategoryPhoto
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("DAL.Entities.Ad", b =>
                {
                    b.Property<decimal>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("decimal(20,0)");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<decimal>("Id"), 1L, 1);

                    b.Property<string>("AdType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Currency")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PathToPhotos")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double?>("Price")
                        .HasColumnType("float");

                    b.Property<int>("SubCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("UserId")
                        .HasColumnType("decimal(20,0)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PathToPhotos")
                        .IsUnique();

                    b.HasIndex("SubCategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Ads");
                });

            modelBuilder.Entity("DAL.Entities.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("PathToPhoto")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PathToPhoto")
                        .IsUnique()
                        .HasFilter("[PathToPhoto] IS NOT NULL");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("DAL.Entities.PhotoPath", b =>
                {
                    b.Property<string>("MainFolderPath")
                        .HasColumnType("nvarchar(450)");

                    b.Property<decimal?>("AdId")
                        .HasColumnType("decimal(20,0)");

                    b.Property<string>("CategoryId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PathToPhoto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhotoName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime2");

                    b.Property<decimal?>("UserId")
                        .HasColumnType("decimal(20,0)");

                    b.HasKey("MainFolderPath");

                    b.HasIndex("UserId");

                    b.ToTable("PhotoPath");
                });

            modelBuilder.Entity("DAL.Entities.SubCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Section")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("SubCategories");
                });

            modelBuilder.Entity("DAL.Entities.User", b =>
                {
                    b.Property<decimal>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("decimal(20,0)");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<decimal>("Id"), 1L, 1);

                    b.Property<string>("AvatarPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("bit");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserRole")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DAL.Entities.Ad", b =>
                {
                    b.HasOne("DAL.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.HasOne("DAL.Entities.PhotoPath", "PhotoPath")
                        .WithOne("Ad")
                        .HasForeignKey("DAL.Entities.Ad", "PathToPhotos")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAL.Entities.SubCategory", "SubCategory")
                        .WithMany()
                        .HasForeignKey("SubCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Category");

                    b.Navigation("PhotoPath");

                    b.Navigation("SubCategory");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAL.Entities.Category", b =>
                {
                    b.HasOne("DAL.Entities.PhotoPath", "PhotoPath")
                        .WithOne("Category")
                        .HasForeignKey("DAL.Entities.Category", "PathToPhoto");

                    b.Navigation("PhotoPath");
                });

            modelBuilder.Entity("DAL.Entities.PhotoPath", b =>
                {
                    b.HasOne("DAL.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("DAL.Entities.SubCategory", b =>
                {
                    b.HasOne("DAL.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("DAL.Entities.PhotoPath", b =>
                {
                    b.Navigation("Ad");

                    b.Navigation("Category");
                });
#pragma warning restore 612, 618
        }
    }
}
