 package com.AttendanceManagementTest.main.com.AttendanceManagement.AttendanceModule;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Test;


import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;


// import net.bytebuddy.dynamic.loading.ClassInjector.UsingReflection.System;

 public class AttendanceTest{

     private WebDriver driver =new ChromeDriver();
     private String baseUrl = "http://localhost:4200";
     private String expectedDashboardURL = baseUrl + "/dashboard";

     @BeforeSuite
     public void setUp() throws InterruptedException {
         // Set up the ChromeDriver
         System.setProperty("webdriver.chrome.driver", "path/to/chromedriver"); // Replace with the actual path to your chromedriver
//         driver = new ChromeDriver();
         driver.manage().window().maximize();
         Thread.sleep(2000);
     }
     @Test(priority = 1, description = "Login as Admin and Verify Dashboard Redirection")
     public void testAdminLogin() throws InterruptedException {
         driver.get(baseUrl);

         // Login as Admin
         WebElement userID = driver.findElement(By.id("userid"));
         userID.sendKeys("999");

         WebElement password = driver.findElement(By.id("userpassword"));
         password.sendKeys("Allen@123");
         
         WebElement loginButton = driver.findElement(By.className("btn-primary"));
         loginButton.click();

         Thread.sleep(2000); // Wait for redirection
         String currentURL = driver.getCurrentUrl();
         Assert.assertEquals(currentURL, expectedDashboardURL, "Admin Login Failed or Incorrect Redirection");
         System.out.println("Admin Login Successful");
     }


     @Test(priority = 2, description = "Mark Attendance")
     public void testMarkAttendance() throws InterruptedException {
         // Navigate to Mark Attendance page
         driver.findElement(By.className("hamburger-btn")).click();
         Thread.sleep(2000);
         driver.findElement(By.xpath("//summary[text()='Attendance']")).click();
         Thread.sleep(2000);
         driver.findElement(By.linkText("Give Attendance")).click();
         Thread.sleep(2000);

         // Mark attendance for a specific date
         WebElement dateInput = driver.findElement(By.id("attendanceDate"));
         dateInput.sendKeys("2025-02-18");
         Thread.sleep(2000);
         driver.findElement(By.id("submit")).click();

         System.out.println("Attendance marked successfully");
     }


     @Test(priority = 3, description = "View Attendance History")
     public void testViewAttendanceHistory() throws InterruptedException {

         // Navigate to Attendance History page
         driver.findElement(By.className("hamburger-btn")).click();
         Thread.sleep(1000);
         driver.findElement(By.linkText("Your Histoy")).click();
         Thread.sleep(1000);

         // Filter by date and status
         driver.findElement(By.className("hamburger-btn")).click(); //closing the sidebar
         WebElement startDate = driver.findElement(By.xpath("//input[@formcontrolname='startDate']"));
         startDate.sendKeys("01-01-2025");
         WebElement endDate = driver.findElement(By.xpath("//input[@formcontrolname='endDate']"));
         endDate.sendKeys("31-01-2025");

         WebElement dropdown = driver.findElement(By.className("form-select"));
         dropdown.click();
         dropdown.sendKeys("Present");
         dropdown.sendKeys(Keys.ENTER);
         driver.findElement(By.xpath("//button[@type='submit']")).click();
         Thread.sleep(2000);
         System.out.println("Attendance history filtered successfully");
     }


     @Test(priority = 4, description = "View Student Attendances")
     public void testViewStudentAttendances() throws InterruptedException {
         // Navigate to View Student Attendances page
         driver.findElement(By.className("hamburger-btn")).click();
         Thread.sleep(1000);
         driver.findElement(By.linkText("Students")).click();
         Thread.sleep(1000);

         // Filter and update attendance
         driver.findElement(By.className("hamburger-btn")).click();
         WebElement startDate1 = driver.findElement(By.xpath("//input[@formcontrolname=\"startDate\"]"));
         startDate1.sendKeys("01-01-2025");
         WebElement endDate1 = driver.findElement(By.xpath("//input[@formcontrolname=\"endDate\"]"));
         endDate1.sendKeys("31-01-2025");
         WebElement id = driver.findElement(By.xpath("//input[@formcontrolname='id']"));
         id.sendKeys("100");

         WebElement dropdown2 = driver.findElement(By.className("form-select"));
         dropdown2.click();
         dropdown2.sendKeys("Present");
         dropdown2.sendKeys(Keys.ENTER);
         driver.findElement(By.xpath("//button[@type='submit']")).click();
         Thread.sleep(2000);
         System.out.println("Student attendances filtered successfully");

         // Update Attendance
         driver.findElement(By.className("hamburger-btn")).click(); //closing the sidebar
         driver.findElement(By.linkText("View Student Attendances")).click();
         Thread.sleep(1000);
         driver.findElement(By.cssSelector("table tbody tr:first-child button.btn.btn-warning")).click(); // Edit
         WebElement dropdown3 = driver.findElement(By.className("form-select"));
         dropdown3.click();
         dropdown3.sendKeys("Leave");
         driver.findElement(By.className("btn-success")).click(); // Save
         Thread.sleep(2000);

         // Delete Attendance
         driver.findElement(By.cssSelector("table tbody tr:first-child button.btn.btn-danger")).click(); // Delete
         Thread.sleep(1000);
         System.out.println("Student attendance updated and deleted successfully");
     }



     @Test(priority = 5, description = "View Teacher Attendances")
     public void testViewTeacherAttendances() throws InterruptedException {
         // Navigate to View Teacher Attendances page
         driver.findElement(By.className("hamburger-btn")).click();
         Thread.sleep(1000);
         driver.findElement(By.linkText("View Teacher Attendances")).click();
         Thread.sleep(1000);

         // Filter and update attendance
         driver.findElement(By.className("hamburger-btn")).click(); //closing the sidebar
         WebElement startDate2 = driver.findElement(By.xpath("//input[@formcontrolname=\"startDate\"]"));
         startDate2.sendKeys("01-01-2025");
         WebElement endDate2 = driver.findElement(By.xpath("//input[@formcontrolname=\"endDate\"]"));
         endDate2.sendKeys("31-01-2025");
         WebElement id1 = driver.findElement(By.xpath("//input[@formcontrolname='id']"));
         id1.sendKeys("500");

         WebElement dropdown4 = driver.findElement(By.className("form-select"));
         dropdown4.click();
         dropdown4.sendKeys("Leave");
         dropdown4.sendKeys(Keys.ENTER);
         driver.findElement(By.xpath("//button[@type='submit']")).click();
         Thread.sleep(1000);

         //filter again to select present
         WebElement dropdown5 = driver.findElement(By.className("form-select"));
         dropdown5.click();
         dropdown5.sendKeys("Present");
         dropdown5.sendKeys(Keys.ENTER);
         driver.findElement(By.xpath("//button[@type='submit']")).click();
         Thread.sleep(1000);

         // Update Attendance
         JavascriptExecutor js = (JavascriptExecutor) driver;
         js.executeScript("window.scrollTo(0, document.body.scrollHeight);");
         driver.findElement(By.cssSelector("table tbody tr:first-child button.btn.btn-warning")).click(); // Edit
         WebElement dropdown6 = driver.findElement(By.className("form-select"));
         dropdown6.click();
         dropdown6.sendKeys("Absent");
         driver.findElement(By.className("btn-success")).click(); // Save
         Thread.sleep(2000);

         // Delete Attendance
         driver.findElement(By.cssSelector("table tbody tr:first-child button.btn.btn-danger")).click(); // Delete
         Thread.sleep(1000);
         System.out.println("Teacher attendance updated and deleted successfully");
     }

     @Test(priority = 6, description = "View All Attendances")
     public void testViewAllAttendances() throws InterruptedException {
         // Navigate to View All Attendances page
         driver.findElement(By.className("hamburger-btn")).click();
         Thread.sleep(1000);
         driver.findElement(By.linkText("View All Attendances")).click();
         Thread.sleep(1000);

         // Filter and update attendance
         driver.findElement(By.className("hamburger-btn")).click(); //closing the sidebar
         WebElement startDate3 = driver.findElement(By.xpath("//input[@formcontrolname=\"startDate\"]"));
         startDate3.sendKeys("01-01-2025");
         WebElement endDate3 = driver.findElement(By.xpath("//input[@formcontrolname=\"endDate\"]"));
         endDate3.sendKeys("31-01-2025");

         WebElement roledropdown = driver.findElement(By.xpath("//select[@formcontrolname='role']"));
         roledropdown.click();
         roledropdown.sendKeys("Admin");

         WebElement dropdown7 = driver.findElement(By.className("form-select"));
         dropdown7.click();
         dropdown7.sendKeys("Present");
         dropdown7.sendKeys(Keys.ENTER);
         driver.findElement(By.xpath("//button[@type='submit']")).click();
         Thread.sleep(1000);

         // Update and delete attendance
         driver.findElement(By.cssSelector("table tbody tr:first-child button.btn.btn-warning")).click(); // Edit
         WebElement dropdown8 = driver.findElement(By.className("form-select"));
         dropdown8.click();
         dropdown8.sendKeys("Absent");
         driver.findElement(By.className("btn-success")).click(); // Save
         Thread.sleep(2000);

         driver.findElement(By.cssSelector("table tbody tr:first-child button.btn.btn-danger")).click(); // Delete
         Thread.sleep(1000);
         System.out.println("All attendances updated and deleted successfully");

     }


     @AfterSuite
     public void tearDown() {
         if (driver != null) {
             driver.quit();
         }
     }
 }