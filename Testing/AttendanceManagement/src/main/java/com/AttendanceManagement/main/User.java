package com.AttendanceManagement.main;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class User {
	
	public static void main(String[]args) throws InterruptedException
	{
		WebDriver driver=new ChromeDriver();
		String expectedURL = "http://localhost:4200/dashboard";
		driver.get("http://localhost:4200");
	     driver.manage().window().maximize();
	     
	   //login as student
		  //Locate the username and password fields and enter credentials
	     WebElement userID = driver.findElement(By.id("userid"));
	     userID.sendKeys("101");      
	     WebElement password = driver.findElement(By.id("userpassword"));
         password.sendKeys("Johnson@123");
         
         // Click the login button (Update selector if needed)
         WebElement loginButton = driver.findElement(By.className("btn")); // Change ID if needed
         loginButton.click();
         
         // Replace with actual expected URL
         Thread.sleep(2000); // Wait for redirection (Better to use WebDriverWait)
         String currentURL = driver.getCurrentUrl();

         if (currentURL.equals(expectedURL)) {
             System.out.println("Login Successful: logged as student Redirected to Dashboard");
         } else {
             System.out.println("Login Failed or Incorrect Redirection");
         }
          
	}

}
