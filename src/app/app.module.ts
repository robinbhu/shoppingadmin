import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http';
// import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
 
// import { shareData } from './shared/dataSharing.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataSharingService } from './shared/dataSharing.service';
import { SubCategoryComponent } from './sub-category/sub-category.component';
// import { HeaderComponent } from './header/header.component';


const routes: Routes = [
{
	path: 'login', component: LoginComponent 
},
{
	path: 'home', component: HomeComponent 
},
{
	path: 'subCategory', component: SubCategoryComponent
},{
	path: 'edit', component: EditCategoryComponent 
},{ 
	path: '', component: LoginComponent 
} ];
@NgModule({
	declarations: 
	[
		AppComponent, 
		LoginComponent,
		HomeComponent,
		CategoryComponent,     
		EditCategoryComponent, 
		HeaderComponent, 
		SidebarComponent, 
		SubCategoryComponent
	],
	imports: 
	[
		BrowserModule,
		FormsModule,
		SimpleNotificationsModule.forRoot(),
		BrowserAnimationsModule,
		RouterModule.forRoot(routes),
		HttpModule
		// AngularMultiSelectModule
	],
	providers: [DataSharingService],   
	bootstrap: [AppComponent] 

}) 
export class AppModule { }
