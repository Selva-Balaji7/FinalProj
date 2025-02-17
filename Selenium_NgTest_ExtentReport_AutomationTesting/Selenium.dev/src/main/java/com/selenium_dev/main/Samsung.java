package com.selenium_dev.main;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Samsung {
	public static void main(String[] args) throws InterruptedException {
		
		WebDriver driver = new ChromeDriver();
		
		driver.get("https://www.samsung.com/in/offer/");
		
		driver.findElement(By.cssSelector("button[class=\"nv00-gnb-v3__utility-btn gnb__search-btn-js\"]")).click();
		
		Thread.sleep(1000);
		driver.findElement(By.cssSelector("input[name=\"search\"]")).sendKeys("Samsung M05");
		System.out.println("Send keys");
		driver.findElement(By.xpath("//button[@class=\"srd19-gnb-search__btn-search\"]")).click();
		System.out.println("Clicked button");
		
		Thread.sleep(3000);
		driver.close();
		
		
	}

}
