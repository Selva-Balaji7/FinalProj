package com.selenium_dev.main;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 * Hello world!
 *
 */
public class SeleniumDev 
{
    public static void main( String[] args ) throws InterruptedException
    {
       WebDriver driver = new ChromeDriver();
       
       driver.get("https://www.selenium.dev/");
       driver.manage().window().maximize();
       
       driver.findElement(By.cssSelector("a.nav-link[href=\"/downloads\"]")).click();
       System.out.println("Navigated to Downloads Page");
       Thread.sleep(1000);
       
       WebElement browsersButton = driver.findElement(By.xpath("//button[@data-bs-target=\"#supported-browsers\"]")); 
       
       JavascriptExecutor js = (JavascriptExecutor) driver;
       js.executeScript("arguments[0].scrollIntoView(true);",browsersButton);
       
       if(browsersButton.isDisplayed()) {
    	   System.out.println("Browsers Button is displayed");
    	   Thread.sleep(500);
    	   browsersButton.click();
       }
       else {
    	   System.out.println("Browsers Button is not displayed");
       }
       
       
       // FIREFOX
       if(driver.findElement(By.xpath("//img[@alt=\"Firefox\"]")).isDisplayed())
    	   System.out.println("Fire is Displayed in the BrowerList");
       else
    	   System.out.println("Fire is Not Displayed in the BrowerList");
       
       //CHROME
       if(driver.findElement(By.xpath("//img[@alt=\"Chrome\"]")).isDisplayed())
    	   System.out.println("Chrome is Displayed in the BrowerList");
       else
    	   System.out.println("Chrome is Not Displayed in the BrowerList");

       //EDGE
       if(driver.findElement(By.xpath("//img[@alt=\"Edge\"]")).isDisplayed())
    	   System.out.println("Edge is Displayed in the BrowerList");
       else
    	   System.out.println("Edge is Not Displayed in the BrowerList");
       
       Thread.sleep(5000);
       driver.close();
    }
}
