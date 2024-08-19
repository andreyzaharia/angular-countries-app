import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { ContriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';

//como si fuesen enums

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit{
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(private countriesService: ContriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegions.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegions.region;
  }

  searchByRegion(region: Region) {
    this.isLoading = true;

    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
