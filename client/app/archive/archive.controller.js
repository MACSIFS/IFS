(function() {
    angular
        .module('app')
        .controller('ArchiveCtrl', ArchiveController);

    function ArchiveController() {
        console.log("Archive Control Online");
        
        var vm = this;
        
        vm.filterTerm = '';
        vm.lectures = [
            {code: 'IMT4421', name: 'Scientific Methodology', semester: 'Autumn', date: new Date('2015, 8, 19').getTime()},
            {code: 'IMT4072', name: 'Cross-media Color Reproduction', semester: 'Autumn', date: new Date('2015, 9, 9').getTime()},
            {code: 'IMT4202', name: 'Image Processing and Analysis', semester: 'Autumn', date: new Date('2015, 9, 22').getTime()},
            {code: 'IMT4421', name: 'Scientific Methodology', semester: 'Autumn', date: new Date('2015, 9, 9').getTime()},
            {code: 'IMT4202', name: 'Image Processing and Analysis', semester: 'Autumn', date: new Date('2015, 11, 3').getTime()},
            {code: 'IMT4072', name: 'Cross-media Color Reproduction', semester: 'Autumn', date: new Date('2015, 10, 9').getTime()},
            {code: 'IMT4003', name: 'Applied Computer Science Project', semester: 'Autumn', date: new Date('2015, 9, 9').getTime()}
        ];
    }
})();