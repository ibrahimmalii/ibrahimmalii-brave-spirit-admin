import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Inject, HostListener} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {PopupSettingsModel} from "@syncfusion/ej2-inplace-editor/src/inplace-editor/base/models-model";
import { TextBoxModel } from '@syncfusion/ej2-inputs';
import {environment} from "../../../environments/environment";
import {FormBuilder} from "@angular/forms";
import {DOCUMENT, ViewportScroller} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dateValue: Date = new Date('11/23/2018');

  homeSectionsNames: string[] = [];

  public settings: PopupSettingsModel = {
    title: 'Enter title'
  };
  public overviewModel: TextBoxModel = {
    placeholder: 'Enter employee name'
  };
  isLoaded: boolean = false;

  homeObj: any;
  baseUrl: string = environment.baseUrl + '/home/';

  windowScrolled: boolean = true;
  constructor(private _homeService: HomeService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
              @Inject(DOCUMENT) private document: Document,
              private viewPortScroller: ViewportScroller
  ) { }

  private sectionFilesContainer: any = {
    'banner': [],
    'problem': [],
    'about': [],
    'book': [],
    'contact': [],
    'advices': [],
    'guaranties': [],
    'categories': [],
    'companies': [],
    'paid': [],
    'recommendations': [],
    'testimonials': [],
    'solutions': [],
    'steps': []
  }

  private sectionNamesContainer: any = {
    'banner': [],
    'problem': [],
    'about': [],
    'book': [],
    'contact': [],
    'advices': [],
    'guaranties': [],
    'categories': [],
    'companies': [],
    'paid': [],
    'recommendations': [],
    'testimonials': [],
    'solutions': [],
    'steps': []
  }

  sectionImagesUrls: Object = {
    'banner': '',
    'problem': '',
    'about': '',
    'book': '',
    'contact': '',
    'advices': [],
    'guaranties': [],
    'categories': [],
    'companies': [],
    'paid': [],
    'recommendations': [],
    'testimonials': [],
    'solutions': [],
    'steps': []
  }

  private mappedSectionsName: Object = {
    'banner': 'لافتة',
    'problem': 'مشكلة',
    'about': 'حول',
    'book': 'غطاء_الكتاب',
    'contact': 'تواصل',
    'advices': 'نصيحة',
    'guaranties': 'ضمان',
    'categories': 'نوع',
    'companies': 'شركة',
    'paid': 'شهادة',
    'recommendations': 'توصية',
    'testimonials': 'شهادة',
    'solutions': 'حل',
    'steps': 'خطوة'
  }

  ngOnInit(): void {
    this._homeService.get().subscribe((res) => {
      this.isLoaded = true;
      this.homeObj = res;
      this.mapSectionsImagesUrls();
    }, console.error, () => {
      this.isLoaded = true;
    });
  }

  private mapSectionsImagesUrls()
  {
    this.homeSectionsNames = Object.keys(this.homeObj);
    for (let sectionImagesUrlsKey in this.sectionImagesUrls) {

      // @ts-ignore
      if(Array.isArray(this.sectionImagesUrls[sectionImagesUrlsKey])) {
        if(['solutions', 'steps'].includes(sectionImagesUrlsKey)){

          this.homeObj[sectionImagesUrlsKey]['ar']['descriptions'].forEach((item: { image: string; }) => {
            // @ts-ignore
            this.sectionImagesUrls[sectionImagesUrlsKey].push(this.baseUrl+item.image);
          });
        } else {

          this.homeObj[sectionImagesUrlsKey]['ar'].forEach((item: { image: string; }) => {

            // @ts-ignore
            this.sectionImagesUrls[sectionImagesUrlsKey].push(this.baseUrl+item.image);
          });
        }
      } else {

        // @ts-ignore
        this.sectionImagesUrls[sectionImagesUrlsKey] = sectionImagesUrlsKey === 'book' ? this.baseUrl + this.homeObj[sectionImagesUrlsKey]['ar']['cover']:this.baseUrl + this.homeObj[sectionImagesUrlsKey]['ar']['image'];
      }
    }
  }

  changeImage(event:any, sectionName: string, isArray: boolean = false, index: number = 0) {
    let reader = new FileReader();
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.sectionFilesContainer[sectionName].push(file);
      let extensionName = file.name.split('.').pop();
      reader.onload = () => {
        if(!isArray){
          this.submitImg(reader, sectionName, extensionName);
        } else {
          this.submitImg(reader, sectionName, extensionName, isArray, index);
        }
      }
      this.cdr.markForCheck();
    }
  }



  submitImg(reader: any, sectionName: string, extensionName: string, isArray: boolean = false, index: number = 0){
    if(!isArray){
      // @ts-ignore
      this.sectionImagesUrls[sectionName] = reader.result;
      if(sectionName !== 'book') {
        // @ts-ignore
        this.homeObj[sectionName]['ar']['image'] = `${sectionName}/${this.mappedSectionsName[sectionName]}.${extensionName}`;
        // @ts-ignore
        this.homeObj[sectionName]['ar']['alt_image'] = this.mappedSectionsName[sectionName];
        this.homeObj[sectionName]['en']['image'] = `${sectionName}/${sectionName}.${extensionName}`;
        this.homeObj[sectionName]['en']['alt_image'] = sectionName;
        this.sectionNamesContainer[sectionName].push({
          ar: `${this.homeObj[sectionName]['ar']['alt_image']}.${extensionName}`,
          en: `${this.homeObj[sectionName]['en']['alt_image']}.${extensionName}`
        })
      } else {
        // @ts-ignore
        this.homeObj[sectionName]['ar']['cover'] = `${sectionName}/${this.mappedSectionsName[sectionName]}.${extensionName}`;
        // @ts-ignore
        this.homeObj[sectionName]['ar']['alt_cover'] = this.mappedSectionsName[sectionName];
        this.homeObj[sectionName]['en']['cover'] = `${sectionName}/${sectionName}.${extensionName}`;
        this.homeObj[sectionName]['en']['alt_cover'] = sectionName;
        this.sectionNamesContainer[sectionName].push({
          ar: `${this.homeObj[sectionName]['ar']['alt_cover']}.${extensionName}`,
          en: `${this.homeObj[sectionName]['en']['alt_cover']}.${extensionName}`
        })
      }
    } else {
      // @ts-ignore
      this.sectionImagesUrls[sectionName][index] = reader.result;
      if(Array.isArray(this.homeObj[sectionName]['ar'])) {
        // @ts-ignore
        this.homeObj[sectionName]['ar'][index]['image'] = `${sectionName}/${this.mappedSectionsName[sectionName]}_${index}.${extensionName}`;
        // @ts-ignore
        this.homeObj[sectionName]['ar'][index]['alt_image'] = `${this.mappedSectionsName[sectionName]}_${index}`;
        this.homeObj[sectionName]['en'][index]['image'] = `${sectionName}/${sectionName}_${index}.${extensionName}`;
        this.homeObj[sectionName]['en'][index]['alt_image'] = `${sectionName}_${index}`;
        this.sectionNamesContainer[sectionName].push({
          ar: `${this.homeObj[sectionName]['ar'][index]['alt_image']}.${extensionName}`,
          en: `${this.homeObj[sectionName]['en'][index]['alt_image']}.${extensionName}`
        })
      } else {
        // @ts-ignore
        this.homeObj[sectionName]['ar']['descriptions'][index]['image'] = `${sectionName}/${this.mappedSectionsName[sectionName]}_${index}.${extensionName}`;
        // @ts-ignore
        this.homeObj[sectionName]['ar']['descriptions'][index]['alt_image'] = `${this.mappedSectionsName[sectionName]}_${index}`;
        this.homeObj[sectionName]['en']['descriptions'][index]['image'] = `${sectionName}/${sectionName}_${index}.${extensionName}`;
        this.homeObj[sectionName]['en']['descriptions'][index]['alt_image'] = `${sectionName}_${index}`;
        this.sectionNamesContainer[sectionName].push({
          ar: `${this.homeObj[sectionName]['ar']['descriptions'][index]['alt_image']}.${extensionName}`,
          en: `${this.homeObj[sectionName]['en']['descriptions'][index]['alt_image']}.${extensionName}`
        })
      }

    }
  }

  changeDescriptionOrZippedDescription($event: any,
                                       sectionName: string,
                                       lang: string = 'ar',
                                       propertyToChange: string = 'description',
                                       isArray: boolean = false,
                                       index: number = 0
  ) {
    if(!isArray) {
      if(lang === 'ar') {

        this.homeObj[sectionName]['ar'][propertyToChange] = $event;
      } else {

        this.homeObj[sectionName]['en'][propertyToChange] = $event;
      }
    } else {
      if(lang === 'ar') {

        this.homeObj[sectionName]['ar'][index][propertyToChange] = $event;
      } else {

        this.homeObj[sectionName]['en'][index][propertyToChange] = $event;
      }
    }
  }

  /**
   *   About accordion
   */
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  async saveHome() {
    this.isLoaded = false;
    const formData = new FormData();
    formData.append("content", JSON.stringify(this.homeObj));
    for (let sectionNamesContainerKey in this.sectionNamesContainer) {
      if(this.sectionNamesContainer[sectionNamesContainerKey].length) {
        formData.append("target", sectionNamesContainerKey);
        formData.append("names", JSON.stringify(this.sectionNamesContainer[sectionNamesContainerKey]));
        if(this.sectionFilesContainer[sectionNamesContainerKey].length){
          this.sectionFilesContainer[sectionNamesContainerKey].forEach((file: File, index: any) => { formData.append(`file${index}`, file, file.name); });
        }
        this._homeService.patch(formData).subscribe(console.log, console.error);
        await this.sleep(1000);
      }
    }

    this._homeService.patch(formData).subscribe(() => {
      this.isLoaded = true;
    }, () => {
      this.isLoaded = true;
    }, () => {
      this.isLoaded = true;
    });
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * About Sections Services
   */

  addNewSection(sectionName: string, subSectionName: string = '') {
    let currentCopiedObj = {};
    if(subSectionName){
      Object.keys(this.homeObj[sectionName]['ar'][subSectionName][0]).forEach(key => {
        // @ts-ignore
        currentCopiedObj[key] = '';
      });

      this.homeObj[sectionName]['ar'][subSectionName].push(currentCopiedObj)

      this.homeObj[sectionName]['en'][subSectionName].push(currentCopiedObj)
    } else {

      Object.keys(this.homeObj[sectionName]['ar'][0]).forEach(key => {
        // @ts-ignore
        currentCopiedObj[key] = '';
      });

      this.homeObj[sectionName]['ar'].push(currentCopiedObj)

      this.homeObj[sectionName]['en'].push(currentCopiedObj)
    }
  }

  removeSection(sectionName: string, index: number, lang: string = 'ar', subSectionName: string = '') {
    if(!subSectionName){

      this.homeObj[sectionName][lang].splice(index, 1);
    } else {

      this.homeObj[sectionName][lang][subSectionName].splice(index, 1);
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothScroll() {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  onClickScroll(location: any) {
    this.viewPortScroller.scrollToPosition(location);
    // location.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  resetDefault() {
    this.isLoaded = false;
    this._homeService.reset().subscribe((res) => {
      this.isLoaded = true;
      this.homeObj = res;
      this.mapSectionsImagesUrls();
    }, console.error, () => {
      this.isLoaded = true;
    });
  }

  setAsDefault(){
    if(confirm('It will set all partitions as default and you will not be able to restore them. :)')) {
      this.isLoaded = false;
      this.saveHome().then(() => {
        this._homeService.setAsDefault().subscribe((res) => {
          this.isLoaded = true;
        }, console.error, () => {
          this.isLoaded = true;
        });
      })
    }
  }
}
