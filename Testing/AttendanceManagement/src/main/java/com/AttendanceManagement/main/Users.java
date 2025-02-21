package com.AttendanceManagement.main;

import java.util.List;


import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class Users {
	public static void main(String[]args) throws InterruptedException
	{

		WebDriver driver=new ChromeDriver();
		String expectedURL = "http://localhost:4200/dashboard";
		driver.get("http://localhost:4200");
	     driver.manage().window().maximize();
	     Thread.sleep(2000);
	     WebElement userID = driver.findElement(By.id("userid"));
	     userID.sendKeys("999");
	     WebElement password = driver.findElement(By.id("userpassword"));
	     password.sendKeys("Allen@123");
	     WebElement loginButton = driver.findElement(By.className("btn")); // Change ID if needed
	     loginButton.click();
	     Thread.sleep(2000); 
	     
	     //view users
	     driver.findElement(By.className("hamburger-btn")).click();
	     Thread.sleep(2000); 
	     driver.findElement(By.xpath("//summary[text()='Users']")).click();
	     Thread.sleep(2000);
	     driver.findElement(By.linkText("View Users")).click();
	     Thread.sleep(2000);
	     driver.findElement(By.id("userid")).sendKeys("999");
	     Thread.sleep(2000);
	     WebElement role=driver.findElement(By.xpath("//select[@formcontrolname=\"role\"]"));
	     role.click();
	     Thread.sleep(2000);
	     role.sendKeys("Admin");
	     role.click();
	     Thread.sleep(2000);
	     driver.findElement(By.xpath("//button[@type='submit']")).click();
	     Thread.sleep(2000); 
	 
	     //approve users
	     driver.findElement(By.className("hamburger-btn")).click();
	     Thread.sleep(2000); 
	     driver.findElement(By.linkText("Approve User")).click();
	     Thread.sleep(2000);
	     List<WebElement> view=driver.findElements(By.xpath("//button[@type='button']"));
	     view.get(1).click();
	     Thread.sleep(2000);
	     driver.findElement(By.className("approvebtn")).click();
	     System.out.println("approved successfully");
	     Thread.sleep(2000);
	     List<WebElement> view1=driver.findElements(By.xpath("//button[@type='button']"));
	     view1.get(1).click();
	     Thread.sleep(2000);
	     driver.findElement(By.className("rejectbtn")).click();
	     Thread.sleep(2000);
	     System.out.println("rejected successfully");
	     
	}
}