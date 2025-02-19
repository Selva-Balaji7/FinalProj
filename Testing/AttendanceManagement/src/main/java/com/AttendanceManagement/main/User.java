package com.AttendanceManagement.main;

import org.openqa.selenium.By;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;

public class User {
	
	public static void main(String[]args) throws InterruptedException
	{
		
		WebDriver driver=new ChromeDriver();
		String expectedURL = "http://localhost:4200/dashboard";
		driver.get("http://localhost:4200");
	     driver.manage().window().maximize();
	     
	     
	     //user-login:
	     /*WebElement userID=driver.findElement(By.id("userid"));
	     Thread.sleep(2000);
	     userID.click();
	     Thread.sleep(2000);
	     userID.sendKeys("1");
	     WebElement pass=driver.findElement(By.id("userpassword"));
	     Thread.sleep(2000);
	     pass.click();
	     Thread.sleep(2000);
	     pass.sendKeys("Allensdfsdfs23");
	     Thread.sleep(2000);
	     boolean login=driver.findElement(By.xpath("//button[@type='submit']")).isEnabled();
	     if(login==true)
	     {
	    	System.out.println("test failed"); 
	     }
	     else
	     {
	    	 System.out.println("test passed");  
	     }
	     Thread.sleep(2000);
	     WebElement idmsg = driver.findElement(By.xpath("//div[contains(@class, 'warningmessage') and contains(text(), 'Id is a 3 or 4 Digit Number')]"));
	     if(idmsg.isDisplayed()) {
	    	 System.out.println("warning for id is present");
	     }
	     else {
	    	 System.out.println("warning for id is not present");
	     }
	     Thread.sleep(2000);
	     driver.findElement(By.id("userid")).click();
	     WebElement pmsg = driver.findElement(By.xpath("//div[contains(@class, 'warningmessage') and contains(text(), 'InValid Password')]"));
	     if(pmsg.isDisplayed()) {
	    	 System.out.println("warning for password is present");
	     }
	     else {
	    	 System.out.println("warning for password is not present");
	     }*/
	     
	     //forgot password
	     driver.findElement(By.linkText("Forgot Password?")).click();
	     Thread.sleep(2000);
	     WebElement id=driver.findElement(By.id("userid"));
	     id.click();
	     Thread.sleep(2000);
	     id.sendKeys("999");
	     Thread.sleep(2000); 
	     WebElement pass1=driver.findElement(By.id("email"));
	     pass1.click();
	     Thread.sleep(2000);
	     pass1.sendKeys("allen@gmail.com");
	     Thread.sleep(2000);
	     driver.findElement(By.className("btn-primary")).click(); 
	     Thread.sleep(2000);
	     WebElement userfound = driver.findElement(By.xpath("//div[contains(@class, 'successmessage') and contains(text(), 'Found User')]"));
	     if(userfound.isDisplayed()) {
	    	 System.out.println("userfound text is present");
	     }
	     else {
	    	 System.out.println("userfound text is not present");
	     }
	     
	     //change password 
	     driver.findElement(By.id("password")).sendKeys("Allen@123");
	     Thread.sleep(2000);
	     driver.findElement(By.id("confirmpassword")).sendKeys("Allen@123");
	     Thread.sleep(2000);
	     driver.findElement(By.className("btn-success")).click(); 
	     
	     //new user
	     driver.findElement(By.linkText("New User")).click();
	     driver.findElement(By.id("userid")).sendKeys("4853");
	     Thread.sleep(2000);
	     driver.findElement(By.id("username")).sendKeys("selva");
	     Thread.sleep(2000);
	     driver.findElement(By.id("useremail")).sendKeys("selva@123");
	     Thread.sleep(2000);
	     driver.findElement(By.id("userpassword")).sendKeys("Selva@123"); 
	     Thread.sleep(2000);
	     WebElement dropdown=driver.findElement(By.name("role"));
	     dropdown.click();
	     Thread.sleep(2000);
	     dropdown.sendKeys("Selva@123");
	     Thread.sleep(2000);
	     driver.findElement(By.xpath("//input[@type='file']")).click();
	     
	     
	     
	     
	     
	     
	     
	     
	     
	     
	     
	     
	     
	     
	     
	     
	   //login as student
		  //Locate the username and password fields and enter credentials
	    /* WebElement userID1 = driver.findElement(By.id("userid"));
	     userID1.sendKeys("101");      
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
         
         //UserDetails
         driver.findElement(By.className("hamburger-btn")).click();
         Thread.sleep(2000);
         Actions actions=new Actions(driver);
         actions.moveByOffset(100, 100).click().perform();
         Thread.sleep(2000);
         boolean img=driver.findElement(By.className("profileimage")).isDisplayed();
         System.out.println("Profile image present:"+img);
         driver.findElement(By.linkText("Give your attendance")).click();
         Thread.sleep(2000);
         driver.findElement(By.className("dashboardbtn")).click();
         Thread.sleep(2000);
         driver.findElement(By.linkText("Request Leave")).click();
         Thread.sleep(2000);
         driver.findElement(By.xpath("//select[@formcontrolname='leaveTypeId']")).click();
         Thread.sleep(2000);
         WebElement selectLeave=driver.findElement(By.xpath("//button[@type='submit']"));
         selectLeave.click();
         Thread.sleep(2000);
         selectLeave.sendKeys("SL");
         Thread.sleep(2000);
         WebElement date=driver.findElement(By.id("startDate"));
         date.click();
         Thread.sleep(2000);
         date.sendKeys("02-19-2025");
         Thread.sleep(2000);
         WebElement reason=driver.findElement(By.id("reason"));
         reason.click();
         Thread.sleep(2000);
         reason.sendKeys("Feeling not well");
         Thread.sleep(2000);
         driver.findElement(By.className("btn-success")).click();
         System.out.println("Leave applied successfully");
         Thread.sleep(2000);
         driver.findElement(By.className("dashboardbtn")).click();
         Thread.sleep(2000);
         driver.findElement(By.linkText("View Attendance Requests from Students")).click();
         Thread.sleep(2000);
         driver.findElement(By.id("Approve1002025-01-31")).click();
         Thread.sleep(2000);
         driver.findElement(By.id("Reject1032025-01-31")).click();
         Thread.sleep(2000);
         driver.findElement(By.className("dashboardbtn")).click();*/
	     }
	    		 
	     
	    
	   
	     
          
	}


